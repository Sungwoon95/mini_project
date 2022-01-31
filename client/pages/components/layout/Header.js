import React from 'react';
import {useRouter} from 'next/router'
import Link from 'next/link'


const Header = () => {
  return(
    <div className="Header container">
      <Link href="/">
        <div className="Header__logo">
          <div className="Header__logo--image">
          </div>
          <div className="Header__logo--title">
            Hacker News
          </div>
        </div>
      </Link>
      <div className="Header__about">
        <div className="Header__about--theme">
          <div className="Header__about--theme-icons">
            
          </div>
        </div>
        <div className="Header__about--descript">
        <span class="material-icons">
help
</span>
        </div>
      </div>
    </div>
  )
}

export default Header;