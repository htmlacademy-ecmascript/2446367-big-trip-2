import { randomBoolean } from '../utils.js';

const mockWaypoints = [
  {
    'id': 'f4b62099-293f-4c3d-a702-94eec4a2808c-001',
    'basePrice': 1100,
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destination': 'cfe416cq-10xa-ye10-8077-2fs9a01edcab-001',
    'isFavorite': randomBoolean(),
    'offers': [
      'b4c3e4e6-9053-42ce-b747-e281314baa31-014',
    ],
    'type': 'flight'
  },
  {
    'id': 'f4b62099-293f-4c3d-a702-94eec4a2808c-002',
    'basePrice': 2100,
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destination': 'cfe416cq-10xa-ye10-8077-2fs9a01edcab-002',
    'isFavorite': randomBoolean(),
    'offers': [
      'b4c3e4e6-9053-42ce-b747-e281314baa31-011',
    ],
    'type': 'drive'
  },
  {
    'id': 'f4b62099-293f-4c3d-a702-94eec4a2808c-003',
    'basePrice': 100,
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destination': 'cfe416cq-10xa-ye10-8077-2fs9a01edcab-004',
    'isFavorite': randomBoolean(),
    'offers': [
      'b4c3e4e6-9053-42ce-b747-e281314baa31-017'
    ],
    'type': 'check-in'
  },
  {
    'id': 'f4b62099-293f-4c3d-a702-94eec4a2808c-003',
    'basePrice': 450,
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destination': 'cfe416cq-10xa-ye10-8077-2fs9a01edcab-005',
    'isFavorite': randomBoolean(),
    'offers': [
      'b4c3e4e6-9053-42ce-b747-e281314baa31-018',
      'b4c3e4e6-9053-42ce-b747-e281314baa31-019'
    ],
    'type': 'sightseeing'
  },
];

export { mockWaypoints };
