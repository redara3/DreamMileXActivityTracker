import NProgress from 'nprogress';
import Router from 'next/router';

let timeout;

const start = url => {
  timeout = setTimeout(NProgress.start, 50);
};

const done = url => {
  clearTimeout(timeout);
  NProgress.done();
};

const error = url => {
  clearTimeout(timeout);
  NProgress.done();
};

Router.events.on('routeChangeStart', start);
Router.events.on('routeChangeComplete', done);
Router.events.on('routeChangeError', error);

const Named = () => (
  <style jsx global>
    {`
      /* Make clicks pass-through */
      #nprogress {
        pointer-events: none;
      }
      #nprogress .bar {
        background: #00acc1;
        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;
        width: 100%;
        height: 5px;
      }
      /* Fancy blur effect */
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px #00acc1, 0 0 5px #00acc1;
        opacity: 1;
        -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
        transform: rotate(3deg) translate(0px, -4px);
      }
    `}
  </style>
);
export default Named;