export const PAGES_MENU = [
  {
    path: '',
    children: [
      {
        path: 'student-dashboard',
        data: {
          menu: {
            title: 'Student dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0,
          }
        },
      },
      {
        path: 'jobs',
        data: {
          menu: {
            title: 'Jobs',
            icon: 'fa fa fa-briefcase',
            selected: false,
            expanded: false,
            order: 1,
          }
        },
      }
    ]
  }
];
