<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'transport' => 'mailgun',
        'domain' => env('MAILGUN_DOMAIN', 'andboxe75850eef69d4bd09980110a579f1e20.mailgun.org'),
        'secret' => env('MAILGUN_SECRET', '7b14268fc9d32490d784ec25925f4514-b02bcf9f-fc951799'),
        'endpoint' => 'api.mailgun.net',
        'scheme' => 'https',
],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

];
