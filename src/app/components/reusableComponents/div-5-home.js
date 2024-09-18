import Link from "next/link";
import React from "react";

export default function Div5(prop) {
  return (
    <>
      <div className="col-md-3 col-sm-6 mb-5 text-center hover-text mb-4 py-3">
        <Link
          href={{ pathname: `${prop.href}` }}
          className="text-decoration-none text-dark  "
        >
          <i
            className="mb-3 d-flex justify-content-center  "
            style={{ fontSize: 100 }}
          >
            {prop.icon}
          </i>
          <h5>{prop.title}</h5>
        </Link>
      </div>
    </>
  );
}
