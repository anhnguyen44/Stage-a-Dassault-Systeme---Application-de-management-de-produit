var cacheName = 'v1.1';
var cacheFiles = [
    './test.html',
]

self.addEventListener('install', function (e) {
    console.log("[ServiceWorker] installed");

    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log("[ServiceWorker] catching cacheFiles");
            return cache.addAll(cacheFiles);
        })
    )
});

self.addEventListener('activate', function (e) {
    console.log("[ServiceWorker] activated");

    e.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(cacheNames.map(function (thisCacheName) {
                if (thisCacheName !== cacheName) {
                    console.log("[ServiceWorker] removing cached files from", thisCacheName);
                    return caches.delete(thisCacheName);
                }
            }))
        })
    )
});

self.addEventListener('fetch', function (e) {
    console.log("[ServiceWorker] fetching", e.request.url);

    // caches.match(e.request).then(function(response){
    //     if(response){
    //         console.log("[ServiceWorker] found in the cache",e.request.url);
    //         return response;
    //     }else{
    //         if(e.request.url.includes('.html') && !e.request.url.includes('ExperiencePlayer')){
    //             console.log('MODEL NEW DEMANDE');
    //             var names = e.request.url.split('/');
    //             var name = names[names.length-1];
    //             name = name.split('.')[0];
    //             console.log(name);
    //             // cacheName = name;
    //         }
    //         fetch(e.request)
    //         .then(function(response){
    //             if(response){
    //                 var requestClone = e.request.clone();
    //                 var responseClone = response.clone();
    //                 caches.open(cacheName).then(function(cache){
    //                     cache.put(requestClone,responseClone);
    //                     return response;
    //                 })
    //             }
    //         })
    //     }
    // })


    // caches.match(e.request).then(function (response) {
    //     if (response) {
    //         console.log("[ServiceWorker] found in the cache", e.request.url);
    //         console.log(response);
    //         return response;
    //     } else {
    //         var requestClone = e.request.clone();

    //         fetch(e.request)
    //             .then(function (response) {
    //                 if (!response) {
    //                     if (!response) {
    //                         console.log("[ServiceWorker] no response from fetch");
    //                         return response;
    //                         // cas: no reponse from fetch and also no reponse from cache
    //                         //return reponse(null)
    //                     }
    //                 }

    //                 var responseClone = response.clone();
    //                 caches.open(cacheName).then(function (cache) {
    //                     cache.put(requestClone, responseClone);
    //                     return response;
    //                 })

    //             })
    //         // .catch(function(err){
    //         //     console.log("[ServiceWorker] Error fetching and catching new data",err);
    //         // })
    //     }
    // })

    const url = new URL(e.request.url);

    

    if(url.origin == location.origin && url.pathname=='/'){
        e.respondWith(caches.match('/test.html'));
        return;
    }

    e.respondWith(
        caches.match(e.request)
            .then(response=>response || fetch(e.request))
    );



    // e.respondWith(
    //     caches.match(e.request)
    //         .then(response => response || fetch(e.request))
    //         .catch(()=>{
    //             if(e.request.mode == 'navigate'){
    //                 return caches.match('/offline.html')
    //             }
    //         })
    // );
});