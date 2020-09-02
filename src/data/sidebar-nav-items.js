export default function() {
  return [
    {
      title: "Blog Dashboard",
      to: "/blog-overview",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "Blog Posts",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/blog-posts",
    },
    {
      title: "Add New Post",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/add-new-post",
    },
    {
      title: "Forms & Components",
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: "/components-overview",
    },
    {
      title: "Tables",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/tables",
    },
    {
      title: "User Profile",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/user-profile-lite",
    },
    {
      title: "Errors",
      htmlBefore: '<i class="material-icons">error</i>',
      to: "/errors",
    },
    {
      title: "KAS",
      htmlBefore: '<i class="material-icons">KAS</i>',
      to: "/KAS",
    },
    {
      title: "일단 로그인",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/login",
    },
    {
      title: "매장관리",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/store",
    },
    {
      title: "메뉴관리",
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: "/menu",
    },
  ];
}