"use strict";
/**
 * This file was auto-generated by Fern from our API Definition.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultionApiClient = void 0;
const environments = __importStar(require("./environments"));
const core = __importStar(require("./core"));
const MultionApi = __importStar(require("./api"));
const serializers = __importStar(require("./serialization"));
const url_join_1 = __importDefault(require("url-join"));
const errors = __importStar(require("./errors"));
const Client_1 = require("./api/resources/lowLevel/client/Client");
class MultionApiClient {
    constructor(_options) {
        this._options = _options;
    }
    /**
     * Browse the web using MultiOn.
     * @throws {@link MultionApi.UnprocessableEntityError}
     *
     * @example
     *     await multionApi.browse({
     *         url: "url"
     *     })
     */
    browse(request, requestOptions) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const _response = yield core.fetcher({
                url: (0, url_join_1.default)((_a = (yield core.Supplier.get(this._options.environment))) !== null && _a !== void 0 ? _a : environments.MultionApiEnvironment.Default, "api/v1/browse"),
                method: "POST",
                headers: {
                    X_MULTION_API_KEY: yield core.Supplier.get(this._options.apiKey),
                    "X-Fern-Language": "JavaScript",
                },
                contentType: "application/json",
                body: yield serializers.BrowseInput.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
                timeoutMs: (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
                maxRetries: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries,
            });
            if (_response.ok) {
                return yield serializers.BrowseOutput.parseOrThrow(_response.body, {
                    unrecognizedObjectKeys: "passthrough",
                    allowUnrecognizedUnionMembers: true,
                    allowUnrecognizedEnumValues: true,
                    breadcrumbsPrefix: ["response"],
                });
            }
            if (_response.error.reason === "status-code") {
                switch (_response.error.statusCode) {
                    case 422:
                        throw new MultionApi.UnprocessableEntityError(yield serializers.HttpValidationError.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            breadcrumbsPrefix: ["response"],
                        }));
                    default:
                        throw new errors.MultionApiError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                        });
                }
            }
            switch (_response.error.reason) {
                case "non-json":
                    throw new errors.MultionApiError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                    });
                case "timeout":
                    throw new errors.MultionApiTimeoutError();
                case "unknown":
                    throw new errors.MultionApiError({
                        message: _response.error.errorMessage,
                    });
            }
        });
    }
    /**
     * This function is used to retrieve information from a website based on user query.
     * @throws {@link MultionApi.UnprocessableEntityError}
     *
     * @example
     *     await multionApi.retrieve("session_id", {
     *         url: "url"
     *     })
     */
    retrieve(sessionId, request, requestOptions) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const _response = yield core.fetcher({
                url: (0, url_join_1.default)((_a = (yield core.Supplier.get(this._options.environment))) !== null && _a !== void 0 ? _a : environments.MultionApiEnvironment.Default, `api/v1/retrieve/${sessionId}`),
                method: "POST",
                headers: {
                    X_MULTION_API_KEY: yield core.Supplier.get(this._options.apiKey),
                    "X-Fern-Language": "JavaScript",
                },
                contentType: "application/json",
                body: yield serializers.Message.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
                timeoutMs: (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
                maxRetries: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries,
            });
            if (_response.ok) {
                return yield serializers.RetrieveOutput.parseOrThrow(_response.body, {
                    unrecognizedObjectKeys: "passthrough",
                    allowUnrecognizedUnionMembers: true,
                    allowUnrecognizedEnumValues: true,
                    breadcrumbsPrefix: ["response"],
                });
            }
            if (_response.error.reason === "status-code") {
                switch (_response.error.statusCode) {
                    case 422:
                        throw new MultionApi.UnprocessableEntityError(yield serializers.HttpValidationError.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            breadcrumbsPrefix: ["response"],
                        }));
                    default:
                        throw new errors.MultionApiError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                        });
                }
            }
            switch (_response.error.reason) {
                case "non-json":
                    throw new errors.MultionApiError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                    });
                case "timeout":
                    throw new errors.MultionApiTimeoutError();
                case "unknown":
                    throw new errors.MultionApiError({
                        message: _response.error.errorMessage,
                    });
            }
        });
    }
    get lowLevel() {
        var _a;
        return ((_a = this._lowLevel) !== null && _a !== void 0 ? _a : (this._lowLevel = new Client_1.LowLevel(this._options)));
    }
}
exports.MultionApiClient = MultionApiClient;
