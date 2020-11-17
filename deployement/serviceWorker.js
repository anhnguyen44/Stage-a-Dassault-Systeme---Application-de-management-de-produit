importScripts('./lib/zip.js');
importScripts('./lib/ArrayBufferReader.js');
importScripts('./lib/deflate.js');
importScripts('./lib/inflate.js');

zip.useWebWorkers = false;
var nameCache;
var cachePromise;


// During installation, extend the event to recover the package
// for this recipe and install into an offline cache.
self.oninstall = function (event) {
    // console.log("event install", event);
};

// Control the clients as soon as possible.
self.onactivate = function (event) {
    // event.waitUntil(self.clients.claim());
    // console.log("event active",event);
};

// Answer by querying the cache. If fail, go to the network.
// self.onfetch = function (event) {
//     let url = new URL(event.request.url);

//     if (!event.request.url.includes("DataCache")) {
//         return fetch(event.request).then(function (res) {
//             if (res) {
//                 return res;
//             }
//         });
//     } else {
//         if (event.request.url.includes("mp4")) {
//             var data = caches.match(event.request, { ignoreSearch: hasQuery }).then(function (response) {
//                 if (response) {
//                     return response;
//                 }
//             });
//             event.respondWith(data);
//         }else{
//             console.log("URL DATA", event.request.url)
//             var hasQuery = event.request.url.indexOf('?') != -1;
    
//             var data = caches.match(event.request, { ignoreSearch: hasQuery }).then(function (response) {
//                 if (response) {
//                     return response;
//                 }
//             });
//             event.respondWith(data);
//         }
        
//     }
// };
self.onfetch = function (event) {
    let url = new URL(event.request.url);

    if (!event.request.url.includes("DataCache")) {
        return fetch(event.request).then(function (res) {
            if (res) {
                return res;
            }
        });
    } else {

        // console.log("URL DATA", event.request.url)
        var hasQuery = event.request.url.indexOf('?') != -1;

        var data = caches.match(event.request, { ignoreSearch: hasQuery }).then(function (response) {
            if (response) {
                return response;
            }
        });
        event.respondWith(data);

    }
};

self.onmessage = function (event) {
    if (event) {
        if (event.data) {
            if (event.data.type) {
                if (event.data.type == "MESSAGE_IDENTIFIER") {
                    if (event.data.dataFile) {
                        // nameCache = "Data-cache";
                        openCacheByName(nameCache)
                        // caches.delete(nameCache);
                        if (nameCache) {
                            event.data.dataFile.arrayBuffer().then(getZipReader).then(cacheContents).then(() => {
                                event.source.postMessage("Hi client");
                            });
                        }

                    }
                } else if (event.data.type == "changeNameCache") {
                    if (event.data.nameFile) {
                        nameCache = event.data.nameFile;
                        // openCacheByName (nameCache);
                    }
                } else if (event.data.type == "ticketUrl") {
                    // console.log(event.data.name);
                    nameCache = event.data.name;

                    event.waitUntil(fetch(event.data.ticketUrl, {
                        'method': 'GET',
                        'headers': {
                            'SecurityContext': 'ctx%3A%3AVPLMProjectLeader.MyCompany.3DS%20Collab%20Space'
                        }
                    }).then(function (res) {
                        // event.waitUntil(fetch("https://ve4al132dsy.dsone.3ds.com:444/3DDashboard/api/widget/proxy/internal/9G-tlFOAKJMuFS0f1W0G/20200609T125715Z/CAAWebAppsPorfolioTemplate/LegoCarBundle.zip").then(function (res) {
                        console.log("res",res);
                        return res.arrayBuffer()
                    })
                        .then(getZipReader).then(cacheContents)
                        .then(function () {
                            event.source.postMessage("Hi client, stoké");
                        })
                        .then(self.skipWaiting.bind(self)));
                    event.waitUntil(self.skipWaiting());
                    // console.log(event.data.file.arrayBuffer());
                } else if (event.data.type == "ticketUrl2") {
                    // console.log(event.data.name);
                    nameCache = event.data.name;

                    event.waitUntil(fetch(event.data.ticketUrl, {
                        'method': 'GET',
                        'headers': {
                            'SecurityContext': 'ctx%3A%3AVPLMProjectLeader.MyCompany.3DS%20Collab%20Space'
                        }
                    }).then(function (res) {
                        // event.waitUntil(fetch("https://ve4al132dsy.dsone.3ds.com:444/3DDashboard/api/widget/proxy/internal/9G-tlFOAKJMuFS0f1W0G/20200609T125715Z/CAAWebAppsPorfolioTemplate/LegoCarBundle.zip").then(function (res) {
                        console.log("res",res);
                        return res.arrayBuffer()
                    })
                        .then(getZipReader).then(cacheContents)
                        .then(function () {
                            event.source.postMessage(event.data.name);
                        })
                        .then(self.skipWaiting.bind(self)));
                    event.waitUntil(self.skipWaiting());
                    // console.log(event.data.file.arrayBuffer());
                } else if (event.data.type == "CHANGENAMECACHE2") {
                    const name = event.data.name;
                    caches.delete(name);
                    cachePromise = caches.open(name);
                } else if (event.data.type == "CONNECTION") {
                    console.log("client connected SW");
                    // event.source.postMessage("Hi client");
                    const dataFile = event.data.dataFile;
                    nameCache = dataFile.label;
                    cachePromise = caches.open(nameCache);

                    cachePromise.then(function (cache) {
                        if (cache) {
                            // event.waitUntil(fetch(dataFile.value, {
                            //     'method': 'GET',
                            //     'headers': {
                            //         'SecurityContext': 'ctx%3A%3AVPLMProjectLeader.MyCompany.3DS%20Collab%20Space'
                            //     }
                            // }).then(function (res) {
                            //     // event.waitUntil(fetch("https://ve4al132dsy.dsone.3ds.com:444/3DDashboard/api/widget/proxy/internal/9G-tlFOAKJMuFS0f1W0G/20200609T125715Z/CAAWebAppsPorfolioTemplate/LegoCarBundle.zip").then(function (res) {
                            //     // console.log("res",res);
                            //     return res.arrayBuffer()
                            // })
                                // .then(getZipReader).then(cacheContents).then(function () {
                                //     event.source.postMessage("Hi client, stoké");
                                // }).then(self.skipWaiting.bind(self)));
                            // event.waitUntil(self.skipWaiting());

                            fetch(dataFile.value, {
                                'method': 'GET',
                                'headers': {
                                    'SecurityContext': 'ctx%3A%3AVPLMProjectLeader.MyCompany.3DS%20Collab%20Space'
                                }
                            })
                                .then(function (response) {
                                    return response.arrayBuffer();
                                })
                                .then(getZipReader)
                                .then(cacheContents)
                                .then(() => event.source.postMessage("Hi client, stoké"))
                                .then(self.skipWaiting.bind(self)) // control clients ASAP
                        }
                    })
                }
            }
        }
    }
}

async function fetchData(url) {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    if (buf) {
        return buf;
    }

}

// This wrapper promisifies the zip.js API for reading a zip.
function getZipReader(data) {
    console.log("data of array buffer", data);
    return new Promise(function (fulfill, reject) {
        zip.createReader(new zip.ArrayBufferReader(data), fulfill, reject);
    });
}

// Use the reader to read each of the files inside the zip
// and put them into the offline cache.
function cacheContents(reader) {
    // console.log("Come in cache Contents");
    return new Promise(function (fulfill, reject) {
        reader.getEntries(function (entries) {
            // console.log('Installing', entries.length, 'files from zip');
            Promise.all(entries.map(cacheEntry)).then(fulfill, reject);
        });
    });
}

// Cache one entry, skipping directories.
function cacheEntry(entry) {
    // console.log('Come in to cacheEntry');
    if (entry.directory) { return Promise.resolve(); }

    return new Promise(function (fulfill, reject) {
        // The writer specifies the format for the data to be read as.
        // This case, we want a generic blob as blob is one of the supported
        // formats for the `Response` constructor.
        entry.getData(new zip.BlobWriter(), function (data) {
            return openCache().then(function (cache) {
                var location = getLocation(entry.filename);
                var response = new Response(data, {
                    headers: {
                        // As the zip says nothing about the nature of the file, we extract
                        // this information from the file name.
                        'Content-Type': getContentType(entry.filename)
                    }
                });

                // console.log('-> Caching', location,
                //             '(size:', entry.uncompressedSize, 'bytes)');

                // If the entry is the index, cache its contents for root as well.
                if (entry.filename === 'index.html') {
                    // Response are one-use objects, as `.put()` consumes the data in the body
                    // we need to clone the response in order to use it twice.
                    cache.put(getLocation(), response.clone());
                }
                console.log("Caching...");

                return cache.put(location, response);
            }).then(fulfill, reject);
        });
    });
}

// Return the location for each entry.
function getLocation(filename) {
    return location.href.replace(/serviceWorker\.js$/, "DataCache/" + filename || 'DataCache');
}

var contentTypesByExtension = {
    'css': 'text/css',
    'js': 'application/javascript',
    'png': 'image/png',
    'jpg': 'image/jpg',
    'jpeg': 'image/jpeg',
    'svg': 'image/svg+xml',
    'html': 'text/html',
    'htm': 'text/html',
    'json': 'application/json',
    'mp4': 'video/mp4'
};

// Return the content type of a file based on the name extension
function getContentType(filename) {
    var tokens = filename.split('.');
    var extension = tokens[tokens.length - 1];
    return contentTypesByExtension[extension] || 'text/plain';
}

// Opening a cache is an expensive operation. By caching the promise
// returned by `cache.open()` we only open the cache once.


function openCache() {
    // if (!cachePromise) { cachePromise = caches.open(nameCache); return cachePromise; }
    // else {
    //     return cachePromise;
    // }
    return cachePromise;
}
function openCacheByName(name) {
    // if (!cachePromise || name !== nameCache) {
    cachePromise = caches.open(name);
    return cachePromise;
    // }
}