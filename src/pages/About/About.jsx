import React from "react"

import "./About.scss" // Eğer özel stil dosyası kullanacaksanız burada import edebilirsiniz

function About() {
  return (
    <div className='about-container'>
      <h1 className='about-title'>About Cocktail Search App</h1>
      <p className='about-description'>
        Cocktail Lab is your ultimate destination for discovering a world of delightful cocktails.
        Our platform is dedicated to bringing you innovative and classic cocktail recipes from
        around the globe. Whether you're a mixology enthusiast or just starting your journey into
        the world of cocktails, Cocktail Lab is here to inspire and guide you.
      </p>
      {/* <h2 className='team-title'>Meet Our Team</h2>
      <div className='team-members'>
             <div className='team-member'>
          <img
            src='url_to_team_member_avatar'
            alt='Team Member Name'
            className='team-member-avatar'
          />
          <p className='team-member-name'>Team Member Name</p>
          <p className='team-member-role'>Team Member Role</p>
        </div>
         </div> */}
    </div>
  )
}

export default About
