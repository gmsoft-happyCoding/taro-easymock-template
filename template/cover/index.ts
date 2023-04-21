import instance from './instance';
import { convertRESTAPI } from '{{$$.relative("util")}}';
import type { Opts } from "{{$$.relative("type")}}";

<% _.forEach(data.mocks, function(mock){ %>/** {{mock.description}} */
function {{$$.convertMethod(mock)}}(opts:Opts) {
  return instance({
    method:'{{$$.methodtoLowerCase(mock.method)}}',
    url: <% if($$.isREST(mock.url)) {%>convertRESTAPI('{{mock.url}}', opts)<%} else {%> '{{mock.url}}'<% } %>,
    opts: opts
  });
}

<% }) %>export {<% _.forEach(data.mocks, function(mock, i){ %>
  {{$$.convertMethod(mock)}}<% if(data.mocks.length - 1 !== i) { %>,<% } %><% }) %>
};