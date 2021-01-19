'use strict';(function(){const input=document.querySelector('#gdoc-search-input');const results=document.querySelector('#gdoc-search-results');let showParent=false
showParent=true
input.addEventListener('focus',init);input.addEventListener('keyup',search);function init(){input.removeEventListener('focus',init);input.required=true;loadScript('/js/groupBy-62b30ac391.min.js');loadScript('/js/flexsearch-ad47a5e1ee.min.js');loadScript('/js/en.search-data.min.141a7ae46b4c8b379c88f5ec42e9c7675e841ef9eed6f6add041a970e27f6c8e.js',function(){input.required=false;search();});}
function search(){while(results.firstChild){results.removeChild(results.firstChild);}
if(!input.value){return results.classList.remove("has-hits");}
let searchHits=window.geekdocSearchIndex.search(input.value,10);if(searchHits.length<1){return results.classList.remove("has-hits");}
results.classList.add("has-hits");if(showParent){searchHits=groupBy(searchHits,hit=>hit.parent);}
const items=[];if(showParent){for(const section in searchHits){const item=document.createElement('li'),title=item.appendChild(document.createElement('span')),subList=item.appendChild(document.createElement('ul'));title.textContent=section;createLinks(searchHits[section],subList);items.push(item);}}else{const item=document.createElement('li'),title=item.appendChild(document.createElement('span')),subList=item.appendChild(document.createElement('ul'));title.textContent="Results";createLinks(searchHits,subList);items.push(item);}
items.forEach(item=>{results.appendChild(item);})}
function createLinks(pages,target){const items=[];for(const page of pages){const item=document.createElement("li"),entry=item.appendChild(document.createElement("span")),a=entry.appendChild(document.createElement("a"));entry.classList.add("flex")
a.href=page.href;a.textContent=page.title;a.classList.add("gdoc-search__entry")
if(target){target.appendChild(item);continue}
items.push(item);}
return items;}
function loadScript(src,callback){let script=document.createElement('script');script.defer=true;script.async=false;script.src=src;script.onload=callback;document.body.appendChild(script);}})();