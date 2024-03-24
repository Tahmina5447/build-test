import { Icon } from '@iconify/react';
import React from 'react';

const WhatsAppButton = ({
    productQuantity,
    productUrl,
    productName,
    productPrice
}) => {


    const productDetails = {
        name: productName,
        price: productPrice,
        url: productUrl,
    };

    const whatsappMessage = `  Hi, I want to talk about this :
    
    ${productDetails.url}

    - ${productDetails.name}
    - ${productDetails.price}৳
    
   `; // Format the URL as a clickable link

    const whatsappLink = `https://wa.me/+8801734404040/?text=${encodeURIComponent(whatsappMessage)}`;


    return (
        <>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <button
                    title={
                        productQuantity < 1 ? "Out of Stock" : "WhatsApp Order"
                    }
                    className='flex gap-1 items-center btn btn-primary w-full text-base-100 font-bold  rounded '
                    disabled={productQuantity < 1}

                >
                    <Icon icon="logos:whatsapp-icon" className=' text-white text-[18px]' />Order Now
                </button>
            </a>

        </>
    );
};

export default WhatsAppButton;