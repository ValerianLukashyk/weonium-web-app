export const workFields = [
    { name: 'title', displayName: 'Title', id: 'work-title', placeholder: 'Enter work title', textArea: false },
    { name: 'period', displayName: 'Period', id: 'work-period', placeholder: 'Enter a year or years period', textArea: false },
    { name: 'description', displayName: 'Description', id: 'work-description', placeholder: 'Leave description', textArea: true},
    { name: 'url', displayName: 'Url to website', id: 'work-url', placeholder: "Enter your work's website url", textArea: false },
    { name: 'stack', displayName: 'Stack', id: 'work-stack', placeholder: 'JS, PHP, REACT, NODE.js etc...', textArea: false },
]
export const glFields = [
    { name: 'title', displayName: 'Title', id: 'workGl-title', placeholder: 'Enter work title', textArea: false },
    { name: 'description', displayName: 'Description', id: 'workGl-description', placeholder: 'Leave description', textArea: true },
    { name: 'url', displayName: 'Url to website', id: 'workGl-url', placeholder: "Enter your work's website url", textArea: false },
]

export const values = {
    title: '',
    period: '',
    description: '',
    url: '',
    stack: '',
    files: [],
    videos: [],
}