// serviceWorkerRegistration.ts

// Dies ist ein Beispiel. Du kannst die Logik nach deinen Bedürfnissen anpassen.

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.href.includes('127.0.0.1')
);

export function register(config?: { onSuccess?: () => void; onUpdate?: (registration: ServiceWorkerRegistration) => void }) {
    if ('serviceWorker' in navigator) {
        const publicUrl = new URL(process.env.PUBLIC_URL!, window.location.href);
        if (publicUrl.origin !== window.location.origin) {
            return;
        }

        window.addEventListener('load', () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

            if (isLocalhost) {
                checkValidServiceWorker(swUrl, config!);
                navigator.serviceWorker.ready.then(() => {
                    console.log(
                        'Dieser PWA ist im Offline-Modus verfügbar.'
                    );
                });
            } else {
                registerValidSW(swUrl, config!);
            }
        });
    }
}

function registerValidSW(swUrl: string, config: { onSuccess?: () => void; onUpdate?: (registration: ServiceWorkerRegistration) => void }) {
    navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
            if (registration && registration.onupdatefound) {
                registration.onupdatefound = () => {
                    const installingWorker = registration.installing;
                    if (installingWorker) {
                        installingWorker.onstatechange = () => {
                            if (installingWorker.state === 'installed') {
                                if (navigator.serviceWorker.controller) {
                                    console.log(
                                        'Neue Inhalte sind verfügbar; bitte aktualisieren.'
                                    );
                                    if (config.onUpdate) {
                                        config.onUpdate(registration);
                                    }
                                } else {
                                    console.log('Inhalte sind im Offline-Modus verfügbar.');
                                    if (config.onSuccess) {
                                        config.onSuccess();
                                    }
                                }
                            }
                        };
                    }
                };
            }
        })
        .catch((error) => {
            console.error('Service Worker konnte nicht registriert werden:', error);
        });
}

function checkValidServiceWorker(swUrl: string, config: { onSuccess?: () => void; onUpdate?: (registration: ServiceWorkerRegistration) => void }) {
    fetch(swUrl, {
        headers: { 'Service-Worker': 'script' }
    })
        .then((response) => {
            const contentType = response.headers.get('content-type');
            if (response.status === 404 || (contentType != null && contentType.indexOf('javascript') === -1)) {
                navigator.serviceWorker.ready.then((registration) => {
                    registration.unregister().then(() => {
                        window.location.reload();
                    });
                });
            } else {
                registerValidSW(swUrl, config);
            }
        })
        .catch(() => {
            console.log(
                'Keine Internetverbindung. Es wird möglicherweise eine veraltete Version geladen.'
            );
        });
}
