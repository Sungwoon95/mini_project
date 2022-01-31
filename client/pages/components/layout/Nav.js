import React,{useEffect} from 'react';
import axios from 'axios'

import {useRouter} from 'next/router'
import Link from 'next/link'

const Nav = () => {
  const router = useRouter();
  const category = [
    // {path:'/', sectionName:'Home'},
    {path:'/new', sectionName:'News'},
    {path:'/show', sectionName:'Show'},
    {path:'/ask', sectionName:'Ask'},
    {path:'/jobs', sectionName:'Jobs'},
  ]

  return(
    <>
      <ul className="Nav container flex">
        {category.map((item,idx)=>(
          <li key={idx} className={`Nav__list ${router.asPath === item.path ? "active" : ""}`}>
            <Link href={item.path}>
              <a>
                <span className={`${router.asPath === item.path ? "Nav__list--active-item" : "Nav__list--item"}`}>
                {item.sectionName}
                </span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Nav;