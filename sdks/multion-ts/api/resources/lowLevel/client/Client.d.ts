/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as environments from "../../../../environments";
import * as core from "../../../../core";
import * as MultionApi from "../../..";
export declare namespace LowLevel {
    interface Options {
        environment?: core.Supplier<environments.MultionApiEnvironment | string>;
        apiKey: core.Supplier<string>;
    }
    interface RequestOptions {
        timeoutInSeconds?: number;
        maxRetries?: number;
    }
}
export declare class LowLevel {
    protected readonly _options: LowLevel.Options;
    constructor(_options: LowLevel.Options);
    /**
     * Creates a new session and returns session details including a unique session ID.
     * @throws {@link MultionApi.UnprocessableEntityError}
     *
     * @example
     *     await multionApi.lowLevel.createSession({
     *         url: "url"
     *     })
     */
    createSession(request: MultionApi.Message, requestOptions?: LowLevel.RequestOptions): Promise<MultionApi.SessionCreated>;
    /**
     * @throws {@link MultionApi.UnprocessableEntityError}
     *
     * @example
     *     await multionApi.lowLevel.stepSession("session_id", {
     *         url: "url"
     *     })
     */
    stepSession(sessionId: string, request: MultionApi.Message, requestOptions?: LowLevel.RequestOptions): Promise<MultionApi.SessionStepSuccess>;
    /**
     * @throws {@link MultionApi.UnprocessableEntityError}
     *
     * @example
     *     await multionApi.lowLevel.closeSession("session_id")
     */
    closeSession(sessionId: string, requestOptions?: LowLevel.RequestOptions): Promise<MultionApi.CloseSessionResponse>;
    /**
     * This function is used to get a screenshot for a website.
     * @throws {@link MultionApi.UnprocessableEntityError}
     *
     * @example
     *     await multionApi.lowLevel.retrieveScreenshot("session_id", {
     *         url: "url"
     *     })
     */
    retrieveScreenshot(sessionId: string, request: MultionApi.Message, requestOptions?: LowLevel.RequestOptions): Promise<MultionApi.RetrieveScreenshotResponse>;
    listSessions(requestOptions?: LowLevel.RequestOptions): Promise<MultionApi.ListSessionsResponse>;
}
