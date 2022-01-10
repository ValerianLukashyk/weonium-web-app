import create from 'zustand'
import { server } from '../components/api/api'

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


const useStore = create(set => ({
    loading: false,
    setLoading: (value) => set(() => ({ loading: value })),
    //Auth Section / / / / / / / / / / / / /
    authInfo: {
        id: "",
        displayName: "",
        email: "",
        password: "",
        date: "",
        isAuth: false,
        token: "",
        picture: null,
        accessLevel: 1,
    },
    setAuthInfo: (user) => set(() => ({ authInfo: user })),
    setTempAuthInfo: (user) => set(() => ({ authInfo: { name: user.name, email: user.email } })),
    setIsAuth: () => set(() => ({ authInfo: { isAuth: true } })),
    setNotIsAuth: () => set(() => ({ authInfo: { isAuth: false } })),

    // THREE JS SCENE SECTION
    gpGpuCompute: {},
    setGpuCompute: (data) => set(() => ({ gpGpuCompute: data })),

    shadowMat: {},
    setShadowMat: (mat) => set(() => ({ shadowMat: mat })),
    positionVar: {},
    setPositionVar: (posVar) => set(() => ({ positionVar: posVar })),

    time: 0,
    setTime: () => set((state) => ({ time: state.time + 0.01 })),
    resetTime: set(() => ({ time: 0 })),

    //TODO: RENAME TO WEBGL WORKS
    // WEBGL WORKS SECTION
    posts: [],
    getAllPosts: async () => {
        const token = getCookie('token')
        server.defaults.headers.common["auth-token"] = token
        server.get('/posts')
            .then(res => {
                set({ posts: res.data })
            })
            .catch(err => console.log(err))
    },
    post: {},
    postFetch: async slug => {
        const token = getCookie('token')
        server.defaults.headers.common["auth-token"] = token
        server(`/posts/${slug}`)
            .then(res => {
                set({ post: res.data })
            })
            .catch(err => console.log(err))
    },
    showButtons: false,
    onPostHover: () => set((value) => ({ showButtons: value })),
    

    // WORKS SECTION / / / / / / / / / / / / / / / /
    currentWork: {
        title: '',
        period: '',
        description: '',
        url: '',
        stack: '',
        files: [],
    },
    // setCurrentWork: (data) => set(() => ({ currentWork: data })),
    workFetch: async title => {
        const token = getCookie('token')
        server.defaults.headers.common["auth-token"] = token
        server(`/works/${title}`)
            .then(res => {
                set({ currentWork: res.data })
            })
            .catch(err => console.log(err))
    },
    works: [],
    getAllWorks: async () => {
        const token = getCookie('token')
        server.defaults.headers.common["auth-token"] = token
        server('/works')
            .then(res => {
                set({ works: res.data })
            })
            .catch(err => console.log(err))
    },

    // ADD WORK FORM
    newWorkForm: {
        title: '',
        period: '',
        description: '',
        url: '',
        stack: '',
        screenshots: []
    },
    setNewWorkScreen: (data) => set(() => ({ newWorkForm: { screenshots: data } })),
    setNewWorkForm: (data) => set((state) => ({ newWorkForm: { data } })),
    updatingWork: {},
    updateWork: (data) => {
        const work = new Map();
        for (const [key, value] of Object.entries(data)) {
            work[key] = value
        }
        set(() => ({
            updatingWork: work
        }))
    },

    // ERROR SECTION / / / / / / / / / / / / / / / /
    errors: null,
    setErrors: (error) => set(() => ({ errors: error })),
    clearErrors: () => set(() => ({ errors: null })),

    // Submit form
    formData: null,
    setFormData: (data) => set(() => ({ formData: { [data.name]: data.value } })),
    setFormDataImages: (data) => set(() => ({ formData: { images: data } })),

    // UploadForm
    isDragActive: false,
    toggleDragActive: (value) => set(() => ({ isDragActive: value })),


    // STYLES
    styles: {
        theme: 'dark',
        toggleTheme: () => set((state) => ({ styles: { theme: state.styles.theme === 'dark' ? 'light' : 'dark' } })),

    }
}))

export default useStore