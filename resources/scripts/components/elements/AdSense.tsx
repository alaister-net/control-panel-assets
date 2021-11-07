import React from 'react';
import TitledGreyBox from '@/components/elements/TitledGreyBox';
import tw from 'twin.macro';
import { faAd } from '@fortawesome/free-solid-svg-icons';

export default () => {
    const html = `
        <ins class="adsbygoogle"
            style="display:block"
            data-ad-client="ca-pub-8826541345134443"
            data-ad-slot="7648391044"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
        <img src onerror="(adsbygoogle = window.adsbygoogle || []).push({});">
    `;

    return (
        <TitledGreyBox title={'Advertisement'} icon={faAd} css={tw`w-full my-4`}>
            <div dangerouslySetInnerHTML={{ __html: html}} />
        </TitledGreyBox>
    );
};
