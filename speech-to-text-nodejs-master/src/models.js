/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

exports.getModels = function(options, callback) {
  var token = options.token;
  var modelUrl = options.url || 'https://stream.watsonplatform.net/speech-to-text/api/v1/models';
  var sttRequest = new XMLHttpRequest();
  sttRequest.open('GET', modelUrl, true);
  sttRequest.withCredentials = true;
  sttRequest.setRequestHeader('Accept', 'application/json');
  sttRequest.setRequestHeader('X-Watson-Authorization-Token', token);
  sttRequest.onload = function() {
    var response = JSON.parse(sttRequest.responseText);
    callback(response.models);
  };
  sttRequest.send();
};
