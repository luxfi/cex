import Link from "next/link"

export default props => (
  <li className="navlink">
    <Link href={`/trade?ticker=${props.ticker}`}>
      <a className="btn invert">{props.title}</a>
    </Link>
    <style>{`
      .btn.invert {
        margin: 0;
        padding: 0 48px;
        height: 48px;
        line-height: 48px;
        border-radius: 7px;
        background-color: #ff911e;
        box-shadow: 0 4px 14px 0 rgba(255, 145, 30, 0.39);
        color: white;
      }
      .btn {
        display: inline-block;
        cursor: pointer;
        text-decoration: none;
        padding: 0.25rem 0.5rem;
        margin: -0.25rem -0.5rem;
        border-radius: 7px;
        color: #ff911e;
        background-color: transparent;
        border: none;
        font-size: inherit;
        line-height: inherit;
        transition: background 0.2s ease,color 0.2s ease,box-shadow 0.2s ease;
      }
      .navlink {
        list-style: none;
        margin: 8px 0px;
      }
    `}</style>
  </li>
)