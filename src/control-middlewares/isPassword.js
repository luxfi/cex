let isPassword = (value) => value && typeof value === 'string' && value.length > 6

export default isPassword
