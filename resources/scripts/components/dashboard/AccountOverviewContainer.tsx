import * as React from 'react';
import ContentBox from '@/components/elements/ContentBox';
import ConfigureTwoFactorForm from '@/components/dashboard/forms/ConfigureTwoFactorForm';
import PageContentBlock from '@/components/elements/PageContentBlock';
import tw from 'twin.macro';
import { breakpoint } from '@/theme';
import styled from 'styled-components/macro';
import MessageBox from '@/components/MessageBox';
import { useLocation } from 'react-router-dom';

const Container = styled.div`
  ${tw`flex flex-wrap`};

  & > div {
    ${tw`w-full`};

    ${breakpoint('sm')`
      width: calc(50% - 1rem);
    `}

    ${breakpoint('md')`
      ${tw`w-auto flex-1`};
    `}
  }
`;

export default () => {
    const { state } = useLocation<undefined | { twoFactorRedirect?: boolean }>();

    return (
        <PageContentBlock title={'Account Overview'}>
            {state?.twoFactorRedirect &&
            <MessageBox title={'2-Factor Required'} type={'error'}>
                Your account must have two-factor authentication enabled in order to continue.
            </MessageBox>
            }
            <Container css={[ tw`lg:grid lg:grid-cols-3 mb-10`, state?.twoFactorRedirect ? tw`mt-4` : tw`mt-10` ]}>
                <ContentBox title={'Your SFTP Password'}>
                    <p css={tw`text-xs text-neutral-200`}>
                        <a href="https://client.alaister.net/account/services/" target="_blank">Click here to see or reset your SFTP password.</a>
                    </p>
                </ContentBox>
                <ContentBox title={'Email Address'}>
                    <p css={tw`text-xs text-neutral-200`}>
                        Your email address is automatically synced with your linked third-party authentication account everytime you log in.
                    </p>
                </ContentBox>
                <ContentBox css={tw`md:ml-8 mt-8 md:mt-0`} title={'Configure Two Factor'}>
                    <ConfigureTwoFactorForm/>
                </ContentBox>
            </Container>

        </PageContentBlock>
    );
};
