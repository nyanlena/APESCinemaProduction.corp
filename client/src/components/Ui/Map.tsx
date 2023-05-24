import React, { useEffect } from 'react';

import type { ProjectTypes } from '../../types';

type ProjectTypeProps = {
  project: ProjectTypes;
};

export default function Map({ project }: ProjectTypeProps): JSX.Element {
  console.log(project);
  console.log(project.x);
  useEffect(() => {
    if (project) {
      function init(): void {
        const myMap = new window.ymaps.Map('map', {
          center: [55.753994, 37.622093],
          zoom: 15,
          controls: [],
        });
        const sort = new window.ymaps.Placemark([Number('55.8'), Number('37.8')], {
          balloonContentHeader: 'Межрайонная ИФНС России № 46 по г. Москве',
          balloonContentBody:
            '<img src="https://avatars.mds.yandex.net/get-altay/3986135/2a000001784091b370f8b422b22d7bf98060/XXXL" alt="sort" width="200" heigth="200">',
          balloonContentFooter: 'Вкусный',
        });
        myMap.geoObjects.add(sort);
      }

      void window.ymaps.ready(init);
    }
  }, []);
  return <div id="map" style={{ width: '300px', height: '300px' }} />;
}
