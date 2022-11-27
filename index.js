function getVersions() {
    return new Promise((resolve, reject)=> {
        fetch('https://files.minecraftforge.net/net/minecraftforge/forge/').then(res => res.text()).then(res => {
            const JSONversions = {}
            const majorVersionList = new DOMParser().parseFromString(res, 'text/html').querySelectorAll('.sidebar-nav .section-content .li-version-list');
            majorVersionList.forEach((html, majorVI) => {
                html.querySelectorAll('.nav-collapsible li').forEach((version, majorI) => {
                    const v = version.classList.contains('elem-active') ? version.innerHTML : version.querySelector('a').innerHTML;
                    JSONversions[v] = [];
                    fetch(`https://files.minecraftforge.net/net/minecraftforge/forge/index_${v}.html`).then(res => res.text()).then(res => {
                        const versionsList = new DOMParser().parseFromString(res, 'text/html').querySelectorAll('.download-list-wrapper tbody tr');
                        versionsList.forEach((ver, i) => {
                            JSONversions[v].push({
                                name: ver.querySelector('.download-version').innerHTML.replaceAll('\n', '').replaceAll(' ', '').split('<')[0],
                                link: ver.querySelector('.download-files .download-links li a[title="Direct Download"]').href
                            });
                            if(majorVI + 1 === majorVersionList.length && majorI + 1 === html.querySelectorAll('.nav-collapsible li').length && i + 1 === versionsList.length) setTimeout(() => {
                                resolve(JSONversions);
                            }, 1e3);
                        });
                    }).catch(reject);
                });
            });
        }).catch(reject);
    });
}

