import AOS from "aos";

import "aos/dist/aos.css";

export default () => {
    setTimeout(function(){ AOS.init({ disable: "phone" });}, 1000)
};
