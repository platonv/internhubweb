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
            title: 'View Jobs',
            icon: 'fa fa fa-briefcase',
            selected: false,
            expanded: false,
            order: 1,
          }
        }
      },
      {
        path: 'createJob',
        data: {
          menu: {
            title: 'Create Job',
            icon: 'ion-plus-round',
            selected: false,
            expanded: false,
            order: 0,
          }
        }
      },
      {
        path: 'applications',
        data: {
          menu: {
            title: 'Applications',
            icon: 'fa fa fa-briefcase',
            selected: false,
            expanded: false,
            order: 0,
          }
        }
      }
    ],
  }
];
