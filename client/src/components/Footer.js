import React from 'react';
import StickyFooter from 'react-sticky-footer';

const Footer = ()=>  {
    return (
        <StickyFooter class="footer"

    bottomThreshold={50}
    normalStyles={{
        backgroundColor: "#999999",
            padding: "2rem",
        position: 'fixed', bottom: '0'
    }}
    stickyStyles={{
        backgroundColor: "rgba(255,255,255,.8)",
            padding: "2rem",
        position: 'fixed', bottom: '0'
    }}>
    Add any footer markup here
    </StickyFooter>
    );
}

export default Footer;