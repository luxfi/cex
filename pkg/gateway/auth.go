package gateway

import (
	"context"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

type contextKey string

const (
	ctxUserID    contextKey = "user_id"
	ctxOrgID     contextKey = "org_id"
	ctxAccountID contextKey = "account_id"
	ctxRoles     contextKey = "roles"
)

// JWTAuth returns a chi middleware that validates Bearer JWTs.
// TODO: Switch from HMAC to JWKS/RS256 fetched from IAM's .well-known/openid-configuration
func JWTAuth(secret string, issuerURL string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			auth := r.Header.Get("Authorization")
			if !strings.HasPrefix(auth, "Bearer ") {
				writeJSON(w, 401, map[string]string{"error": "missing or invalid authorization header"})
				return
			}
			tokenStr := strings.TrimPrefix(auth, "Bearer ")

			token, err := jwt.Parse(tokenStr, func(t *jwt.Token) (interface{}, error) {
				if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, jwt.ErrSignatureInvalid
				}
				return []byte(secret), nil
			},
				jwt.WithIssuer(issuerURL),
				jwt.WithValidMethods([]string{"HS256", "HS384", "HS512"}),
			)
			if err != nil || !token.Valid {
				writeJSON(w, 401, map[string]string{"error": "invalid or expired token"})
				return
			}

			claims, ok := token.Claims.(jwt.MapClaims)
			if !ok {
				writeJSON(w, 401, map[string]string{"error": "invalid token claims"})
				return
			}

			ctx := r.Context()
			if sub, _ := claims["sub"].(string); sub != "" {
				ctx = context.WithValue(ctx, ctxUserID, sub)
			}
			if org, _ := claims["org_id"].(string); org != "" {
				ctx = context.WithValue(ctx, ctxOrgID, org)
			}
			if acct, _ := claims["account_id"].(string); acct != "" {
				ctx = context.WithValue(ctx, ctxAccountID, acct)
			}
			if rolesRaw, ok := claims["roles"].([]interface{}); ok {
				var roles []string
				for _, r := range rolesRaw {
					if s, ok := r.(string); ok {
						roles = append(roles, s)
					}
				}
				ctx = context.WithValue(ctx, ctxRoles, roles)
			}

			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

// AdminOnly rejects requests without the "admin" role in JWT claims.
func AdminOnly(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !HasRole(r.Context(), "admin") {
			writeJSON(w, 403, map[string]string{"error": "admin role required"})
			return
		}
		next.ServeHTTP(w, r)
	})
}

// UserIDFromContext returns the user ID from JWT claims.
func UserIDFromContext(ctx context.Context) string {
	v, _ := ctx.Value(ctxUserID).(string)
	return v
}

// OrgIDFromContext returns the org ID from JWT claims.
func OrgIDFromContext(ctx context.Context) string {
	v, _ := ctx.Value(ctxOrgID).(string)
	return v
}

// AccountIDFromContext returns the account ID from JWT claims.
func AccountIDFromContext(ctx context.Context) string {
	v, _ := ctx.Value(ctxAccountID).(string)
	return v
}

// HasRole checks if the JWT claims contain the given role.
func HasRole(ctx context.Context, role string) bool {
	roles, _ := ctx.Value(ctxRoles).([]string)
	for _, r := range roles {
		if r == role {
			return true
		}
	}
	return false
}
