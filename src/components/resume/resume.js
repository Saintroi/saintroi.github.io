import React, { Component } from 'react';
export default class Resume extends Component {
  render() {
    return (
        <section id="resume">
        
        {/* Education
      ----------------------------------------------- */}
        <div className="row education">
          <div className="three columns header-col">
            <h1><span>Education</span></h1>
          </div>
          <div className="nine columns main-col">
            <div className="row item">
              <div className="twelve columns">
                <h3>The University of Alabama</h3>
                <p className="info">Bachelor of Science in Computer Science <span>•</span> <em className="date">December 2017</em></p>
                <p>
                  I grew up 30 minutes from Tuscaloosa and have been a huge Alabama Football fan my entire life, so choosing to attend college there was
                  an obvious choice for me. During my time there I not only learned a lot about programming and algorithms, but about myself and how to become my own person.
                  This came through student jobs and internships, participating on the trumpetline in the Million Dollar Band and in concert band, as well as meeting new
                  people and branching out to new experiences outside of my comfort zone.
                </p>
              </div>
            </div> {/* item end */}
          </div> {/* main-col end */}
        </div> {/* End Education */}
        {/* Work
      ----------------------------------------------- */}
        <div className="row work">
          <div className="three columns header-col">
            <h1><span>Work Experience</span></h1>
          </div>
          <div className="nine columns main-col">
            <div className="row item">
              <div className="twelve columns">
                <h3>Creature</h3>
                <p className="info">IT Specialist / Software Developer <span>•</span> <em className="date">August 2017 - Present</em></p>
                <p>
                  I currently work for a construction company in downtown Birmingham that's trying to put a new spin on the construction industry.
                  Here, I've been a huge player in the company's advances in technology. I started out as an intern during my last semester of school where I
                  helped create software for internal use that let the company gather and see data in a compelling way. This jumpstarted the work that I've been
                  doing as a full time staff member. <br />
                  <br />
                  Since I came on full time in January, we've change the name of the company from Golden Construction & Appleseed Workshop to Creature. 
                  I came on as not only a software developer, but the primary IT technician for the company so I had my hands full creating a new domain
                  to match the company name change, moving everyone's emails over, and then continuing to completely overhaul the internal systems and network
                  to get things modernized and follow best practice.<br />
                  <br />
                  I was also a part of launching exciting applications for the company, including a website to track the status of a newly implemented quarterly incentive program,
                  a form for nominating colleagues for specific attributes, and our largest project which was an interactive page that allows detailed viewing of financial information
                  for each of our construction projects which involved combining information from several applications. Each of these projects are detailed in my projects section.<br />
                  <br />
                  At this job I got my introduction to JavaScript and real world web development and design, as well as on occasion getting to expand my knowledge and flex my muscle a bit
                  with things I am more custom to, like C# programming or Python and Powershell scripting.
                </p>
              </div>
            </div> {/* item end */}
            <div className="row item">
              <div className="twelve columns">
                <h3>Insuresoft</h3>
                <p className="info">Systems Administrator Intern <span>•</span> <em className="date">May - December 2017</em></p>
                <p>
                  Here I was primarily involved in the IT side of things, I learned a lot about higher level IT tasks and systems management.
                  I had previously used an image server for the easy deployment of custom Windows installs to computers and found that there wasn't
                  one being used at Insuresoft, so I guaged interest and ended up creating one on my own over the summer. 
                  <br />
                  <br />
                  In the fall I continued my MDT work and
                  also helped a returning intern work on a VB.NET project to allow automated patch deployment to customer systems. During that I got to parse and re-write the 
                  longest SQL I have ever seen, which was terrifying but ended up being really fun!
                  <br />
                  <br />
                  This job gave me some great friends and invaluable experience. For the first time I felt like a member of a team and had real responsibility that affected
                  the company as a whole. I learned much more than new technological skills, I learned a lot about what it takes to run a small business, what values the leaders of businesses should have, 
                  and how to treat others as well as how I like to be treated. Insuresoft is a wonderful place to work and learn, I am extremely grateful that I had the opportunity.
                </p>
              </div>
            </div> {/* item end */}
            <div className="row item">
              <div className="twelve columns">
                <h3>The Center for Advanced Public Safety</h3>
                <p className="info">Student Software Developer<span>•</span> <em className="date">March - May 2017</em></p>
                <p>
                  This was my second job at UA and also in my life, so I was pretty excited about getting to work here after doing
                  my first job for almost 4 years, and it delivered. CAPS primarily works with state law enforcement to provide applications
                  that support their duties. I was fortunate to work on CARE, their main application that tracks all traffic incidents throughout the state.
                  <br />
                  <br />
                  On CARE, I got to expand my knowledge of C# with .NET and how it interacts with databases of all kinds. My primary goal was to prepare for
                  an enormous dataset of 5 billion records we were set to recieve and input into CARE. This means I got to learn a lot of cool things along the way.
                  Our main concern was the speed of the program, so the idea was to put as much of the data into memory as possible. My boss already had the idea
                  of using R to do this, where we would import all of the data into R and pass all queries to it. To prepare, I needed to create a program that could
                  generate tons of dummy data for us to test with. It took a while to understand the syntax and how everything was being placed into the SQL database for CARE via
                  an internal application, but I got it to generate about a million records per 30 seconds or so and had a lot of fun in the process.
                  <br />
                  <br />
                  R is a language I had never heard of, but quickly became proficient at. It allows easy manipulation and visualization of data, because
                  it holds everything in memory. I found a way to use C# as a bridge so the R server could get data from our SQL database, but we eventuall ran into issues
                  with the sheer amount of RAM we'd have to use in a server running R. This led me down a rabbit hole of investigating other things we could use,
                  including non-relational in-memory databases, a hybrid memory-disk R server created by Microsoft, and several others.
                  <br />
                  <br />
                  While in that process, I was offered the position at Insuresoft based on an interview I did with them before I started with CAPS, I decided to leave mostly for financial
                  reasons and because I was excited to work for a company that I thought might have a full-time place for me after I graduated. I loved my time at CAPS and feel like I learned
                  more about creating useful software there in 3 months than the previous 4 years at my other UA job, it was a wonderful experience!
                </p>
              </div>
            </div> {/* item end */}
            <div className="row item">
              <div className="twelve columns">
                <h3>The Unviersity of Alabama Intercollegiate Athletics</h3>
                <p className="info">Student Helpdesk Technician<span>•</span> <em className="date">September 2013 - March 2017</em></p>
                <p>
                  Once I moved off to college, I knew I was going to need some form of income so I immediately started looking for jobs. I knew enough about computers to be the go-to
                  guy when things went wrong in high school, so I figured I could land some sort of computer gig. That ended up being at the IT helpdesk for the UA Athletic Department,
                  I had no idea what I was getting into.
                  <br />
                  <br />
                  This job took me from knowing how to use computers and fix simple problems to being a total expert and wizard. Nearly 4 years of fixing problems with computers, printers, applications
                  and, occasionally, servers meant that I was always learning something new. After about a year I was the senior student and I got my first taste of leadership experience.
                  I taught and managed the other guys to the best of my ability while the full time staff generally did their own thing and, as long as disaster didn't strike, let us work at our own pace.
                  We kept that department running with an efficiancy that was unprecedented in my time there and I was proud of the work we were doing.
                  <br />
                  <br />
                  While I was there, I helped convert an entire department from Windows laptops to Macbook Pros, cleaned up and organized an insane inventory room, and 
                  replaced 50+ computers in a student-athlete study hall. I became "the Mac guy" after having no OSX experience, I learned how to replace laptop internals,
                  and proudly earned my reputation throughout the department as the guy who could get stuff fixed when it needed to, no matter what.
                  <br />
                  <br />
                  In my senior year, I decided it was time to move on to something that would better prepare me for my future as a software developer.
                  This job will always be remembered in my mind as the one that introduced me to my love of problem solving, showed me what it means to know your value, and pushed me to strive for excellence
                  and settle for nothing less than perfect.
                </p>
              </div>
            </div> {/* item end */}
          </div> {/* main-col end */}
        </div> {/* End Work */}

      </section>
    );
  }
}