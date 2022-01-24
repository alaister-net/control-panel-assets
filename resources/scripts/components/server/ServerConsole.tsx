import React, { lazy, memo } from 'react';
import { ServerContext } from '@/state/server';
import Can from '@/components/elements/Can';
import ContentContainer from '@/components/elements/ContentContainer';
import tw from 'twin.macro';
import ServerContentBlock from '@/components/elements/ServerContentBlock';
import ServerDetailsBlock from '@/components/server/ServerDetailsBlock';
import isEqual from 'react-fast-compare';
import PowerControls from '@/components/server/PowerControls';
import { PIDLimitModalFeature } from '@feature/index';
import ErrorBoundary from '@/components/elements/ErrorBoundary';
import Spinner from '@/components/elements/Spinner';

export type PowerAction = 'start' | 'stop' | 'restart' | 'kill';

const ChunkedConsole = lazy(() => import(/* webpackChunkName: "console" */'@/components/server/Console'));
const ChunkedStatGraphs = lazy(() => import(/* webpackChunkName: "graphs" */'@/components/server/StatGraphs'));

const ServerConsole = () => {
    const isInstalling = ServerContext.useStoreState(state => state.server.data!.isInstalling);
    const isTransferring = ServerContext.useStoreState(state => state.server.data!.isTransferring);
    const eggFeatures = ServerContext.useStoreState(state => state.server.data!.eggFeatures, isEqual);
    const dockerImage = ServerContext.useStoreState(state => state.server.data!.dockerImage);

    return (
        <ServerContentBlock title={'Console'} css={tw`flex flex-wrap`}>
            <div css={tw`w-full lg:w-1/4`}>
                <ServerDetailsBlock/>
                {isInstalling ?
                    <div css={tw`mt-4 rounded bg-yellow-500 p-3`}>
                        <ContentContainer>
                            <p css={tw`text-sm text-yellow-900`}>
                                This server is currently running its installation process and most actions are
                                unavailable.
                            </p>
                        </ContentContainer>
                    </div>
                    :
                    isTransferring ?
                        <div css={tw`mt-4 rounded bg-yellow-500 p-3`}>
                            <ContentContainer>
                                <p css={tw`text-sm text-yellow-900`}>
                                    This server is currently being transferred to another node and all actions
                                    are unavailable.
                                </p>
                            </ContentContainer>
                        </div>
                        :
                        <Can action={[ 'control.start', 'control.stop', 'control.restart' ]} matchAny>
                            <PowerControls/>
                        </Can>
                }
                {dockerImage.includes(':minecraft_java_') && !dockerImage.includes(':minecraft_java_no_hibernate_') &&
                    <div css={tw`mt-4 rounded bg-yellow-500 p-3`}>
                        <ContentContainer>
                            <p css={tw`text-sm text-yellow-900`}>
                                <strong>Hibernation is enabled!</strong><br />
                                When your server has NO online players, you can ignore the 'Can't keep up!' warnings in the console.
                                <strong>Your server run normally when there is one or more online players.</strong>
                            </p>
                        </ContentContainer>
                    </div>
                }
                {dockerImage.includes(':nodejs_') &&
                    <div css={tw`mt-4 rounded bg-primary-900 p-3`}>
                        <ContentContainer>
                            <p css={tw`text-sm`}>
                                <strong>How to install packages with npm/yarn/pnpm commands?</strong><br />
                                Start your server. Answer 'yes' to enable the 'Shell Access Mode'. Type your commands and 
                                press enter to send it. Once it's done, send 'exit' to quit the mode and start your app.
                            </p>
                        </ContentContainer>
                    </div>
                }
                {dockerImage.includes(':python_') &&
                    <div css={tw`mt-4 rounded bg-primary-900 p-3`}>
                        <ContentContainer>
                            <p css={tw`text-sm`}>
                                <strong>How to install packages with pip commands?</strong><br />
                                Start your server. Answer 'yes' to enable the 'Shell Access Mode'. Type your commands and 
                                press enter to send it. Once it's done, send 'exit' to quit the mode and start your app.
                            </p>
                        </ContentContainer>
                    </div>
                }
            </div>
            <div css={tw`w-full lg:w-3/4 mt-4 lg:mt-0 lg:pl-4`}>
                <Spinner.Suspense>
                    <ErrorBoundary>
                        <ChunkedConsole/>
                    </ErrorBoundary>
                    <ChunkedStatGraphs/>
                </Spinner.Suspense>
                <React.Suspense fallback={null}>
                    {eggFeatures.includes('pid_limit') && <PIDLimitModalFeature/>}
                </React.Suspense>
            </div>
        </ServerContentBlock>
    );
};

export default memo(ServerConsole, isEqual);
