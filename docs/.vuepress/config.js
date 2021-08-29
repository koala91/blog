module.exports = {
  title: "学习记录",
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
          "/React/Redux",
        ],
      },
    ],
  },
  markdown: {
    lineNumbers: true,
  },
  evergreen: true,
};
