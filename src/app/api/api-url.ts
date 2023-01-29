const basePath = `https://magni-careers.azurewebsites.net`

// GET - POST
// (create widget & read widgets)
export const widgetsApi = `${basePath}/api/widgets`

// GET
// (read components)
export const componentsApi = `${basePath}/api/components`

// GET - PUT - DELETE
// (read a widget, update a widget, delete a widget | update components, add components, add existing comps)
export const widgetDetailApi = (widgetID: string) => {
  return `${basePath}/api/widgets/${widgetID}`
}