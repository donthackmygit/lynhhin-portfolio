import { INTRO_STORAGE_KEY } from "./intro-session";

// A parser-time script prevents the Hero flashing before React hydrates.
// It only creates its own stylesheet; React-owned markup stays unchanged.
export function IntroBootstrap() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){
          if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
          try{if(window.sessionStorage.getItem('${INTRO_STORAGE_KEY}')==='true')return;}catch(e){}
          var style=document.createElement('style');
          style.id='travel-intro-first-paint';
          style.dataset.startedAt=String(performance.now());
          style.textContent='.travel-intro{display:block}body{overflow:hidden}html{scrollbar-gutter:stable}';
          document.head.appendChild(style);
          window.setTimeout(function(){style.remove();},6000);
        })();`,
      }}
    />
  );
}
