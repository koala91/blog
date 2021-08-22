module.exports = {
  title: "My Blog",
  description: "This is a blog.",
  themeConfig: {
    logo: "/assets/logo.jpg",
    sidebar: [
      {
        title: "React",
        collapsable: false,
        sidebarDepth: 1,
        children: [
          "/React/JSX",
          "/React/组件",
          "/React/表单",
          "/React/路由",
          "/React/生命周期",
        ],
      },
    ],
  },
  markdown: {
    lineNumbers: true,
  },
  evergreen: true,
};
