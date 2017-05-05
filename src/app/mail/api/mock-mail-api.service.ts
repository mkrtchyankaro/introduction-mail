import { Injectable } from "@angular/core";
import { Headers, Request, RequestMethod, Response, ResponseOptions } from "@angular/http";
import { MockConnection } from "@angular/http/testing";
import { APIMockBackend, HEADER_CONTENT_TYPE_JSON } from 'client-toolbox';


@Injectable()
export class MockMailApiService implements APIMockBackend {

    public handleRequest(connection: MockConnection) {

        let req: Request = connection.request;

        if (req.method === RequestMethod.Get && new RegExp('\/api\/vendors\/v1.0\/account\/amazon$').test(req.url)) {
            setTimeout(() => {
                connection.mockRespond(new Response(
                    new ResponseOptions({
                        status: 200,
                        headers: new Headers(HEADER_CONTENT_TYPE_JSON),
                        body: {
                            numOfNewVendors: 125,
                            logo: "img/amazon.png",
                            name: "Ralph",
                            fromEmail: "john.smith@amazon.com",
                            ccEmail: "amazon@vatbox.com"
                        }
                    })));
            }, 500);
        }
        else if (req.method === RequestMethod.Get && new RegExp('\/api\/vendors\/v1.0\/account\/amazon\/vendors').test(req.url)) {
            setTimeout(() => {
                connection.mockRespond(new Response(
                    new ResponseOptions({
                        status: 200,
                        headers: new Headers(HEADER_CONTENT_TYPE_JSON),
                        body: [
                            {
                                typeCode: '4',
                                vendors: [
                                    { id: "11", name: "ASSOCIATION OF CHARTERED CERTIFIED ACCOUNTANTS !! ACCA", rate: 2, countryCode: "GB" },
                                    { id: "12", name: "DHL EXPRESS (IRELAND) LTD", rate: 3, countryCode: "NL" },
                                    { id: "13", name: "DSV SOLUTION A/S", rate: 3, countryCode: "GB" },
                                    { id: "14", name: "Fira Barcelona Heladeria", rate: 0, countryCode: "ES" },
                                    { id: "15", name: "FUTURING", rate: 5, countryCode: "DE" },
                                    { id: "16", name: "GAFFNEY & MC HUGH LTD", rate: 5, countryCode: "IT" }
                                ]
                            },
                            {
                                typeCode: '5',
                                vendors: [
                                    { id: "21", name: "ASSOCIATION OF CHARTERED CERTIFIED ACCOUNTANTS !! ACCA", rate: 2, countryCode: "GB" },
                                    { id: "22", name: "DHL EXPRESS (IRELAND) LTD", rate: 3, countryCode: "NL" },
                                    { id: "23", name: "DSV SOLUTION A/S", rate: 3, countryCode: "GB" },
                                    { id: "24", name: "Fira Barcelona Heladeria", rate: 0, countryCode: "ES" },
                                    { id: "25", name: "FUTURING", rate: 5, countryCode: "DE" },
                                    { id: "26", name: "GAFFNEY & MC HUGH LTD", rate: 5, countryCode: "IT" },
                                    { id: "27", name: "GBT III B.V", rate: 0, countryCode: "DE" },
                                    { id: "28", name: "MERCURE HOTEL TILBURG CENTRUM", rate: 3, countryCode: "NL" },
                                    { id: "29", name: "MICROSOFT IRELAND OPERATIONS LIMITED", rate: 2, countryCode: "GB" },
                                    { id: "210", name: "NATIONAL ROADS AUTHORITY", rate: 1, countryCode: "DE" },
                                    { id: "211", name: "NV KBC AUTOLESE", rate: 1, countryCode: "NL" },
                                    { id: "212", name: "MERCURE HOTEL TILBURG CENTRUM", rate: 3, countryCode: "NL" },
                                    { id: "213", name: "MICROSOFT IRELAND OPERATIONS LIMITED", rate: 2, countryCode: "GB" },
                                    { id: "214", name: "NATIONAL ROADS AUTHORITY", rate: 1, countryCode: "DE" },
                                    { id: "215", name: "NV KBC AUTOLESE", rate: 1, countryCode: "NL" }
                                ]
                            },
                            {
                                typeCode: '6',
                                vendors: [
                                    { id: "31", name: "ASSOCIATION OF CHARTERED CERTIFIED ACCOUNTANTS !! ACCA", rate: 2, countryCode: "GB" },
                                    { id: "32", name: "DHL EXPRESS (IRELAND) LTD", rate: 3, countryCode: "NL" },
                                    { id: "33", name: "DSV SOLUTION A/S", rate: 3, countryCode: "GB" },
                                    { id: "34", name: "Fira Barcelona Heladeria", rate: 0, countryCode: "ES" },
                                    { id: "35", name: "FUTURING", rate: 5, countryCode: "DE" },
                                    { id: "36", name: "GAFFNEY & MC HUGH LTD", rate: 5, countryCode: "IT" },
                                    { id: "37", name: "GBT III B.V", rate: 0, countryCode: "DE" },
                                    { id: "38", name: "MERCURE HOTEL TILBURG CENTRUM", rate: 3, countryCode: "NL" },
                                    { id: "39", name: "MICROSOFT IRELAND OPERATIONS LIMITED", rate: 2, countryCode: "GB" },
                                    { id: "310", name: "NATIONAL ROADS AUTHORITY", rate: 1, countryCode: "DE" },
                                    { id: "311", name: "NV KBC AUTOLESE", rate: 1, countryCode: "NL" }
                                ]
                            },
                            {
                                typeCode: '18',
                                vendors: [
                                    { id: "41", name: "ASSOCIATION OF CHARTERED CERTIFIED ACCOUNTANTS !! ACCA", rate: 2, countryCode: "GB" },
                                    { id: "42", name: "DHL EXPRESS (IRELAND) LTD", rate: 3, countryCode: "NL" },
                                    { id: "43", name: "DSV SOLUTION A/S", rate: 3, countryCode: "GB" },
                                    { id: "44", name: "Fira Barcelona Heladeria", rate: 0, countryCode: "ES" },
                                    { id: "45", name: "FUTURING", rate: 5, countryCode: "DE" },
                                    { id: "46", name: "GAFFNEY & MC HUGH LTD", rate: 5, countryCode: "IT" },
                                    { id: "47", name: "GBT III B.V", rate: 0, countryCode: "DE" },
                                    { id: "48", name: "MERCURE HOTEL TILBURG CENTRUM", rate: 3, countryCode: "NL" },
                                    { id: "49", name: "MICROSOFT IRELAND OPERATIONS LIMITED", rate: 2, countryCode: "GB" },
                                    { id: "410", name: "NATIONAL ROADS AUTHORITY", rate: 1, countryCode: "DE" },
                                    { id: "411", name: "NV KBC AUTOLESE", rate: 1, countryCode: "NL" }
                                ]
                            },
                            {
                                typeCode: '20',
                                vendors: [
                                    { id: "51", name: "ASSOCIATION OF CHARTERED CERTIFIED ACCOUNTANTS !! ACCA", rate: 2, countryCode: "GB" },
                                    { id: "52", name: "DHL EXPRESS (IRELAND) LTD", rate: 3, countryCode: "NL" },
                                    { id: "53", name: "DSV SOLUTION A/S", rate: 3, countryCode: "GB" },
                                    { id: "54", name: "Fira Barcelona Heladeria", rate: 0, countryCode: "ES" },
                                    { id: "55", name: "FUTURING", rate: 5, countryCode: "DE" },
                                    { id: "56", name: "GAFFNEY & MC HUGH LTD", rate: 5, countryCode: "IT" },
                                    { id: "57", name: "GBT III B.V", rate: 0, countryCode: "DE" },
                                    { id: "58", name: "MERCURE HOTEL TILBURG CENTRUM", rate: 3, countryCode: "NL" },
                                    { id: "59", name: "MICROSOFT IRELAND OPERATIONS LIMITED", rate: 2, countryCode: "GB" },
                                    { id: "510", name: "NATIONAL ROADS AUTHORITY", rate: 1, countryCode: "DE" },
                                    { id: "511", name: "NV KBC AUTOLESE", rate: 1, countryCode: "NL" }
                                ]
                            },
                            {
                                typeCode: '21',
                                vendors: [
                                    { id: "61", name: "ASSOCIATION OF CHARTERED CERTIFIED ACCOUNTANTS !! ACCA", rate: 2, countryCode: "GB" },
                                    { id: "62", name: "DHL EXPRESS (IRELAND) LTD", rate: 3, countryCode: "NL" },
                                    { id: "63", name: "DSV SOLUTION A/S", rate: 3, countryCode: "GB" },
                                    { id: "64", name: "Fira Barcelona Heladeria", rate: 0, countryCode: "ES" },
                                    { id: "65", name: "FUTURING", rate: 5, countryCode: "DE" },
                                    { id: "66", name: "GAFFNEY & MC HUGH LTD", rate: 5, countryCode: "IT" },
                                    { id: "67", name: "GBT III B.V", rate: 0, countryCode: "DE" },
                                    { id: "68", name: "MERCURE HOTEL TILBURG CENTRUM", rate: 3, countryCode: "NL" },
                                    { id: "69", name: "MICROSOFT IRELAND OPERATIONS LIMITED", rate: 2, countryCode: "GB" },
                                    { id: "610", name: "NATIONAL ROADS AUTHORITY", rate: 1, countryCode: "DE" },
                                    { id: "611", name: "NV KBC AUTOLESE", rate: 1, countryCode: "NL" }
                                ]
                            },
                            {
                                typeCode: '22',
                                vendors: [
                                    { id: "71", name: "ASSOCIATION OF CHARTERED CERTIFIED ACCOUNTANTS !! ACCA", rate: 2, countryCode: "GB" },
                                    { id: "72", name: "DHL EXPRESS (IRELAND) LTD", rate: 3, countryCode: "NL" },
                                    { id: "73", name: "DSV SOLUTION A/S", rate: 3, countryCode: "GB" },
                                    { id: "74", name: "Fira Barcelona Heladeria", rate: 0, countryCode: "ES" },
                                    { id: "75", name: "FUTURING", rate: 5, countryCode: "DE" },
                                    { id: "76", name: "GAFFNEY & MC HUGH LTD", rate: 5, countryCode: "IT" },
                                    { id: "77", name: "GBT III B.V", rate: 0, countryCode: "DE" },
                                    { id: "78", name: "MERCURE HOTEL TILBURG CENTRUM", rate: 3, countryCode: "NL" },
                                    { id: "79", name: "MICROSOFT IRELAND OPERATIONS LIMITED", rate: 2, countryCode: "GB" },
                                    { id: "710", name: "NATIONAL ROADS AUTHORITY", rate: 1, countryCode: "DE" },
                                    { id: "711", name: "NV KBC AUTOLESE", rate: 1, countryCode: "NL" }
                                ]
                            },
                            {
                                typeCode: '25',
                                vendors: [
                                    { id: "81", name: "ASSOCIATION OF CHARTERED CERTIFIED ACCOUNTANTS !! ACCA", rate: 2, countryCode: "GB" },
                                    { id: "82", name: "DHL EXPRESS (IRELAND) LTD", rate: 3, countryCode: "NL" },
                                    { id: "83", name: "DSV SOLUTION A/S", rate: 3, countryCode: "GB" },
                                    { id: "84", name: "Fira Barcelona Heladeria", rate: 0, countryCode: "ES" },
                                    { id: "85", name: "FUTURING", rate: 5, countryCode: "DE" },
                                    { id: "86", name: "GAFFNEY & MC HUGH LTD", rate: 5, countryCode: "IT" },
                                    { id: "87", name: "GBT III B.V", rate: 0, countryCode: "DE" },
                                    { id: "88", name: "MERCURE HOTEL TILBURG CENTRUM", rate: 3, countryCode: "NL" },
                                    { id: "89", name: "MICROSOFT IRELAND OPERATIONS LIMITED", rate: 2, countryCode: "GB" },
                                    { id: "810", name: "NATIONAL ROADS AUTHORITY", rate: 1, countryCode: "DE" },
                                    { id: "811", name: "NV KBC AUTOLESE", rate: 1, countryCode: "NL" }
                                ]
                            },
                            {
                                typeCode: '27',
                                vendors: [
                                    { id: "91", name: "ASSOCIATION OF CHARTERED CERTIFIED ACCOUNTANTS !! ACCA", rate: 2, countryCode: "GB" },
                                    { id: "92", name: "DHL EXPRESS (IRELAND) LTD", rate: 3, countryCode: "NL" },
                                    { id: "93", name: "DSV SOLUTION A/S", rate: 3, countryCode: "GB" },
                                    { id: "94", name: "Fira Barcelona Heladeria", rate: 0, countryCode: "ES" },
                                    { id: "95", name: "FUTURING", rate: 5, countryCode: "DE" },
                                    { id: "96", name: "GAFFNEY & MC HUGH LTD", rate: 5, countryCode: "IT" },
                                    { id: "97", name: "GBT III B.V", rate: 0, countryCode: "DE" },
                                    { id: "98", name: "MERCURE HOTEL TILBURG CENTRUM", rate: 3, countryCode: "NL" },
                                    { id: "99", name: "MICROSOFT IRELAND OPERATIONS LIMITED", rate: 2, countryCode: "GB" },
                                    { id: "910", name: "NATIONAL ROADS AUTHORITY", rate: 1, countryCode: "DE" },
                                    { id: "911", name: "NV KBC AUTOLESE", rate: 1, countryCode: "NL" }
                                ]
                            },
                            {
                                typeCode: '30',
                                vendors: [
                                    { id: "101", name: "ASSOCIATION OF CHARTERED CERTIFIED ACCOUNTANTS !! ACCA", rate: 2, countryCode: "GB" },
                                    { id: "102", name: "DHL EXPRESS (IRELAND) LTD", rate: 3, countryCode: "NL" },
                                    { id: "103", name: "DSV SOLUTION A/S", rate: 3, countryCode: "GB" },
                                    { id: "104", name: "Fira Barcelona Heladeria", rate: 0, countryCode: "ES" },
                                    { id: "105", name: "FUTURING", rate: 5, countryCode: "DE" },
                                    { id: "106", name: "GAFFNEY & MC HUGH LTD", rate: 5, countryCode: "IT" },
                                    { id: "107", name: "GBT III B.V", rate: 0, countryCode: "DE" },
                                    { id: "108", name: "MERCURE HOTEL TILBURG CENTRUM", rate: 3, countryCode: "NL" },
                                    { id: "109", name: "MICROSOFT IRELAND OPERATIONS LIMITED", rate: 2, countryCode: "GB" },
                                    { id: "1010", name: "NATIONAL ROADS AUTHORITY", rate: 1, countryCode: "DE" },
                                    { id: "1011", name: "NV KBC AUTOLESE", rate: 1, countryCode: "NL" }
                                ]
                            },
                            {
                                typeCode: '31',
                                vendors: [
                                    { id: "111", name: "ASSOCIATION OF CHARTERED CERTIFIED ACCOUNTANTS !! ACCA", rate: 2, countryCode: "GB" },
                                    { id: "112", name: "DHL EXPRESS (IRELAND) LTD", rate: 3, countryCode: "NL" },
                                    { id: "113", name: "DSV SOLUTION A/S", rate: 3, countryCode: "GB" },
                                    { id: "114", name: "Fira Barcelona Heladeria", rate: 0, countryCode: "ES" },
                                    { id: "115", name: "FUTURING", rate: 5, countryCode: "DE" },
                                    { id: "116", name: "GAFFNEY & MC HUGH LTD", rate: 5, countryCode: "IT" },
                                    { id: "117", name: "GBT III B.V", rate: 0, countryCode: "DE" },
                                    { id: "118", name: "MERCURE HOTEL TILBURG CENTRUM", rate: 3, countryCode: "NL" },
                                    { id: "119", name: "MICROSOFT IRELAND OPERATIONS LIMITED", rate: 2, countryCode: "GB" },
                                    { id: "1110", name: "NATIONAL ROADS AUTHORITY", rate: 1, countryCode: "DE" },
                                    { id: "1111", name: "NV KBC AUTOLESE", rate: 1, countryCode: "NL" }
                                ]
                            },
                            {
                                typeCode: '33',
                                vendors: [
                                    { id: "111", name: "ASSOCIATION OF CHARTERED CERTIFIED ACCOUNTANTS !! ACCA", rate: 2, countryCode: "GB" },
                                    { id: "112", name: "DHL EXPRESS (IRELAND) LTD", rate: 3, countryCode: "NL" },
                                    { id: "113", name: "DSV SOLUTION A/S", rate: 3, countryCode: "GB" },
                                    { id: "114", name: "Fira Barcelona Heladeria", rate: 0, countryCode: "ES" },
                                    { id: "115", name: "FUTURING", rate: 5, countryCode: "DE" },
                                    { id: "116", name: "GAFFNEY & MC HUGH LTD", rate: 5, countryCode: "IT" },
                                    { id: "117", name: "GBT III B.V", rate: 0, countryCode: "DE" },
                                    { id: "118", name: "MERCURE HOTEL TILBURG CENTRUM", rate: 3, countryCode: "NL" },
                                    { id: "119", name: "MICROSOFT IRELAND OPERATIONS LIMITED", rate: 2, countryCode: "GB" },
                                    { id: "1110", name: "NATIONAL ROADS AUTHORITY", rate: 1, countryCode: "DE" },
                                    { id: "1111", name: "NV KBC AUTOLESE", rate: 1, countryCode: "NL" }
                                ]
                            },
                            {
                                typeCode: '34',
                                vendors: [
                                    { id: "111", name: "ASSOCIATION OF CHARTERED CERTIFIED ACCOUNTANTS !! ACCA", rate: 2, countryCode: "GB" },
                                    { id: "112", name: "DHL EXPRESS (IRELAND) LTD", rate: 3, countryCode: "NL" },
                                    { id: "113", name: "DSV SOLUTION A/S", rate: 3, countryCode: "GB" },
                                    { id: "114", name: "Fira Barcelona Heladeria", rate: 0, countryCode: "ES" },
                                    { id: "115", name: "FUTURING", rate: 5, countryCode: "DE" },
                                    { id: "116", name: "GAFFNEY & MC HUGH LTD", rate: 5, countryCode: "IT" },
                                    { id: "117", name: "GBT III B.V", rate: 0, countryCode: "DE" },
                                    { id: "118", name: "MERCURE HOTEL TILBURG CENTRUM", rate: 3, countryCode: "NL" },
                                    { id: "119", name: "MICROSOFT IRELAND OPERATIONS LIMITED", rate: 2, countryCode: "GB" },
                                    { id: "1110", name: "NATIONAL ROADS AUTHORITY", rate: 1, countryCode: "DE" },
                                    { id: "1111", name: "NV KBC AUTOLESE", rate: 1, countryCode: "NL" }
                                ]
                            }
                        ]
                    })));
            }, 500);
        }
        else if (req.method === RequestMethod.Post && new RegExp('\/api\/vendors\/v1.0\/account\/amazon\/send\/mail').test(req.url)) {
            setTimeout(() => {
                connection.mockRespond(new Response(
                    new ResponseOptions({
                        status: 200,
                        headers: new Headers(HEADER_CONTENT_TYPE_JSON),
                        body: {}
                    })));
            }, 500);
        }
    }
}


