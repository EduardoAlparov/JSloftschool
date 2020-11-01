/* global ymaps*/

export default class InteractiveMap {
  constructor(mapId, onClick) {
    this.mapId = mapId;
    this.onClick = onClick;
  }

  async init() {
    await this.injectYMapsScript();
    await this.loadYMaps();
    this.initMap();
  }

  injectYMapsScript() {
    return new Promise((resolve) => {
      const ymapsScript = document.createElement('script');
      ymapsScript.src =
        'https://api-maps.yandex.ru/2.1/?apikey=d02525f1-2a0d-4700-a5e1-e4487f06702c&lang=ru_RU';
      document.body.appendChild(ymapsScript);
      ymapsScript.addEventListener('load', resolve);
    });
  }

  loadYMaps() {
    return new Promise((resolve) => ymaps.ready(resolve));
  }

  initMap() {
    this.clusterer = new ymaps.Clusterer({
      groupByCoordinetes: true,
      clusterDisableClickZoom: true,
      clusterOpenBalloonOnClick: false,
    });
    this.clusterer.events.add('click', (e) => {
      const coords = e.get('target').geometry.getCoordinates();
      this.onClick(coords);
    });
    this.map = new ymaps.Map(this.mapId, {
      center: [55.77, 49.15],
      zoom: 14,
      controls: [],
    });

    this.map.controls.add('zoomControl');
    this.map.behaviors.disable(['dblClickZoom']);
    this.map.events.add('click', (e) => this.onClick(e.get('coords')));
    // this.clusterer.add(geoObjects);
    this.map.geoObjects.add(this.clusterer);
  }

  openBalloon(coords, content) {
    this.map.balloon.open(coords, content);
  }

  setBalloonContent(content) {
    this.map.balloon.setData(content);
  }

  closeBalloon() {
    this.map.balloon.close();
  }

  createPlacemark(coords) {
    const placemark = new ymaps.Placemark(
      coords,
      {
        hintContent: 'Кликни меня!',
      },
      {
        iconLayout: 'default#image',
        iconImageHref: require('./img/pin.png').default,
        iconImageSize: [30, 42],
        iconImageOffset: [-15, -21],
      }
    );

    placemark.events.add('click', (e) => {
      const coords = e.get('target').geometry.getCoordinates();
      this.onClick(coords);
    });

    this.map.geoObjects.add(placemark);
  }

  async getAddress(coords) {
    const promise = new Promise((resolve, reject) => {
      ymaps
        .geocode(coords)
        .then((response) => resolve(response.geoObjects.get(0).getAddressLine()))
        .catch((e) => reject(e));
    });
    const objectInfo = await promise;
    return objectInfo;
  }
}
