self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('eduscanplus-cache').then(cache => {
      return cache.addAll([
        '/pages/dashboard.htm',
        '/pages/attendance.htm',
        '/pages/marks.htm',
        '/pages/admitcard.htm',
        '/pages/pyqs.htm',
        '/pages/hostelmenu.htm',
        '/pages/events.htm',
        '/pages/timetable.htm',
        '/pages/syllabus.htm',
        '/pages/notes.htm',
        '/pages/assignments.htm',
        '/pages/notice.htm',
        '/pages/support.htm',
        '/pages/profile.htm',
        '/pages/history.htm',
        '/pages/documents.htm',
        '/pages/clubs.htm',
        '/pages/clubevents.htm'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  // Only cache GET requests
  if (event.request.method !== 'GET') return;
  
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      caches.open('api-cache').then(cache =>
        fetch(event.request)
          .then(response => {
            cache.put(event.request, response.clone());
            return response;
          })
          .catch(() => cache.match(event.request))
      )
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(response => response || fetch(event.request))
    );
  }
});

// Listen for the 'message' event to handle cache updates
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});