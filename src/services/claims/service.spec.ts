import { Ticket, ClaimName } from '@digitalpersona/core';
import { ServiceError } from '../../common';
import { ClaimsService, Database } from '.';
import { ServerStatus, HttpStatus } from '../../test';

var FetchMock = require('fetch-mock');
FetchMock.config.sendAsJson = true;

describe("ClaimsService:", ()=>
{
    const app = "http://test.local/service";
    const ticket: Ticket = {
        jwt: "=====ticket====="
    }
    let service: ClaimsService;

    beforeEach(()=>{
        service = new ClaimsService(app);
    })
    afterEach(()=>{
        FetchMock.restore();
    })

    describe("GetConfiguredClaims", ()=>
    {
        it('must succeed', async () => {
            const result = {
                ticket
            }
            FetchMock.postOnce(`*`
                , { GetConfiguredClaimsResult: result });
            await expectAsync(
                service.GetConfiguredClaims(ticket))
                .toBeResolvedTo(ticket);
        })
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.GetConfiguredClaims(ticket))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        })
    })
    describe("GetClaims", ()=>
    {
        const request = [{
            name: ClaimName.Group,
            db: Database.AD,
            attr: "memberOf"
        }];

        it('must succeed', async () => {
            const result = {
                ticket
            }
            FetchMock.postOnce(`*`
                , { GetClaimsResult: result });
            await expectAsync(
                service.GetClaims(ticket, request))
                .toBeResolvedTo(ticket);
        })
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.GetClaims(ticket, request))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        })
    })

})
