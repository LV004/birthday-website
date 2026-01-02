import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import Confetti from "./Confetti";
import "./MessageCard.css";

function MessageCard({ isActive }) {
  const [curtainsOpened, setCurtainsOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const prevIsActive = useRef(isActive);

  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);
  const curtainHintRef = useRef(null);
  const messageContentRef = useRef(null);

  const message = `Hello Shiveee,

So you just turned 30 few moments back, Ab tu finally aunty wali category me aagyi hai😂
Now some emotional time.... 
The First time i met you was just 2.5 years back, which i can't believe kyuki aisa lgta hai
jaise tujhe kitne barso se janta hu. The first time i saw you, i thought you will be a proper
delhi type girl, full attitude hoga or baki sb bhi ulta ulta jo soch skta hai koi bhi ye assume krk
ki delhi se h. Fir time ka pahiya aisa ghuma ki jo socha tha usse ekdum ulta nikla , sbse helpful, sbse pyari,
down to earth(itni ki height hi kam reh gyi😂), or main point pdhai me husiyar , btao aisi all rounder ladki 
kaha milegi(until aap chirag lekr dhundho).
jab me bimar tha to samne se meri help krna bina mere bole vo baat dil ko chu gyi
Bs dheere dheere aise hi bonding ki shuruat hui.....  fir Stranger things saath dekhna shuru(jo pta nhi kb khatam hoga😂)
and slowly and steadily the bond grew so well that ab toh ye tode na tute😎  
Although we had many ups and down which we wanted to avoid and remove but can't , kyuki aise hi jeevan chlta hai
Your part in my KGP time was far above then any other person and i hope our bond stays like this for life.

Tu noht pyari ladki hai, boht hard working, boht samjdaar or humesha khud se pehle family k liye sochti ..
i really liked these qualities of you.

Bus ab isse jyada likhne gya toh hath dukhne lgega mera isliye bina words k smj ja tu kya mayne rkhte hai mere liye
🤣🤣


Happy Birthday Shiveeeeeeeeeeeeeeeeeeeeeeeeeee! 🎉

—LV`;

  // Handle page transitions
  useEffect(() => {
    // Only trigger on transition to active
    if (isActive && !prevIsActive.current) {
      setTimeout(() => setShowConfetti(true), 10);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      prevIsActive.current = isActive;
      return () => clearTimeout(timer);
    }

    // Reset curtains when leaving page with smooth animation
    if (!isActive && prevIsActive.current) {
      setTimeout(() => {
        setCurtainsOpened(false);

        // Smooth reset animation
        if (curtainLeftRef.current && curtainRightRef.current) {
          const resetTimeline = gsap.timeline();

          resetTimeline.to([curtainLeftRef.current, curtainRightRef.current], {
            opacity: 1,
            duration: 0.3,
          });

          resetTimeline.to(
            [curtainLeftRef.current, curtainRightRef.current],
            {
              x: "0%",
              rotationY: 0,
              duration: 0.5,
              ease: "power2.inOut",
            },
            0.3
          );
        }

        if (messageContentRef.current) {
          gsap.to(messageContentRef.current, {
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
          });
        }
      }, 300);
    }

    prevIsActive.current = isActive;
    return undefined;
  }, [isActive]);

  const handleOpenCurtains = () => {
    if (!curtainsOpened) {
      setCurtainsOpened(true);

      // Detect screen size for responsive animations
      const isMobile = window.innerWidth <= 768;
      const isSmallMobile = window.innerWidth <= 480;

      // Adjust animation parameters based on screen size
      const duration = isSmallMobile ? 1.2 : isMobile ? 1.4 : 1.5;
      const rotationAngle = isSmallMobile ? 10 : isMobile ? 12 : 15;

      // Animate curtain hint fade out
      gsap.to(curtainHintRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: "power2.in",
      });

      // Animate curtains opening with 3D effect
      const timeline = gsap.timeline();

      timeline.to(
        curtainLeftRef.current,
        {
          x: "-100%",
          rotationY: -rotationAngle,
          duration: duration,
          ease: "power3.inOut",
        },
        0
      );

      timeline.to(
        curtainRightRef.current,
        {
          x: "100%",
          rotationY: rotationAngle,
          duration: duration,
          ease: "power3.inOut",
        },
        0
      );

      // Fade out curtains
      timeline.to(
        [curtainLeftRef.current, curtainRightRef.current],
        {
          opacity: 0,
          duration: 0.5,
          delay: isMobile ? 0.8 : 1,
        },
        0
      );

      // Reveal message content with smooth animation
      timeline.to(
        messageContentRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: isMobile ? 0.8 : 1,
          ease: "back.out(1.2)",
          delay: isMobile ? 0.6 : 0.8,
        },
        0
      );
    }
  };

  // Handle touch events for mobile
  const handleTouchStart = () => {
    if (!curtainsOpened) {
      // Add subtle scale effect on touch
      gsap.to(curtainHintRef.current, {
        scale: 0.95,
        duration: 0.1,
      });
    }
  };

  const handleTouchEnd = () => {
    if (!curtainsOpened) {
      gsap.to(curtainHintRef.current, {
        scale: 1,
        duration: 0.1,
      });
    }
  };

  return (
    <section className="message">
      <h2></h2>

      <div className="curtain-container">
        <div className="curtain-rod"></div>

        <div
          className={`curtain-wrapper ${
            curtainsOpened ? "opened opening" : ""
          }`}
          onClick={handleOpenCurtains}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="button"
          tabIndex={curtainsOpened ? -1 : 0}
          aria-label="Click or tap to open the curtains and reveal the birthday message"
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && !curtainsOpened) {
              e.preventDefault();
              handleOpenCurtains();
            }
          }}
        >
          <div ref={curtainLeftRef} className="curtain curtain-left"></div>
          <div ref={curtainRightRef} className="curtain curtain-right"></div>
          {!curtainsOpened && (
            <div ref={curtainHintRef} className="curtain-hint">
              ✨ {window.innerWidth <= 768 ? "Tap" : "Click"} to Open ✨
            </div>
          )}
        </div>

        <div
          ref={messageContentRef}
          className="message-content"
          role="article"
          aria-label="Birthday message"
        >
          <p className="typed-text">{message}</p>
        </div>
      </div>

      {showConfetti && <Confetti />}
    </section>
  );
}

export default MessageCard;
