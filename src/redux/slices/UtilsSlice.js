import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk('/fetchData', async (body, thunkAPI) => {
    try {
        thunkAPI.dispatch(setLoading(true))

        const apikey = process.env.REACT_APP_API_KEY
        let url2 = `https://newsapi.org/v2/top-headlines?page=1&pageSize=20
        &from=2023-05-07&to=2023-05-07&country=in&category=${body.category}&sortBy=popularity&apiKey=${apikey}`

        if (body.qwery !== undefined) {
            thunkAPI.dispatch(emptyArticles())
            thunkAPI.dispatch(setQwery(body.qwery))
            url2 = `https://newsapi.org/v2/everything?q=${body.qwery}&page=1&pageSize=5
            &from=2023-05-07&to=2023-05-07&sortBy=popularity&apiKey=${apikey}`
        }




        const response = await fetch(url2)
        const parsed = await response.json();
        return { ...parsed, cat: body.category, page: 1 };


    } catch (e) {
        console.log(e);

    } finally {
        thunkAPI.dispatch(setLoading(false))
    }


})


export const fetchMore = createAsyncThunk('/fetchMore', async (body, thunkAPI) => {
    try {
        const date = new Date().toISOString().slice(0, 10);

        const prev = date.substring(0,8)+(parseInt(date.substring(8,10))-1).toString()
   

        const apikey = process.env.REACT_APP_API_KEY
        
        let url2 = `https://newsapi.org/v2/everything?q=${body.cat}&page=${body.page}&pageSize=5
        &from=${prev}&to=${date}&sortBy=popularity&apiKey=${apikey}`

        if (body.qwery !== undefined) {
            url2 = `https://newsapi.org/v2/everything?q=${body.qwery === '' ? 'all' : body.qwery}&page=${body.page}&pageSize=5
            &from=2023-05-07&to=2023-05-07&sortBy=popularity&apiKey=${apikey}`
        }

        thunkAPI.dispatch(incPage())




        const response = await fetch(url2)
        const parsed = await response.json();
        return parsed;


    } catch (e) {
        console.log(e);

    } finally {

    }


})




const utilsSlice = createSlice({
    name: "utils",
    initialState: {
        data: {
            articles: [],
            cat: "",
            page: 1,
            totalResults: 0
        },
        qwery:undefined,
        isLoading: false

    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setQwery: (state, action) => {
            state.qwery = action.payload
        },
        incPage: (state, action) => {
            state.data.page = state.data.page + 1

        },
        emptyArticles:(state)=>{
            state.data.articles=[]

        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.fulfilled, (state, action) => {
                state.data.articles = action.payload?.articles?.filter(item => item.urlToImage !== null)
                state.data.cat = action.payload?.cat
                state.data.totalResults = action.payload?.totalResults

            })
            .addCase(fetchMore.fulfilled, (state, action) => {
                state.data?.articles?.push(...(action.payload?.articles?.map(item => {
                    if (item.urlToImage !== null) {

                        return item;
                    }
                    return null;
                })))

            })

    }

})
export default utilsSlice.reducer;
export const { setLoading, incPage,emptyArticles,setQwery } = utilsSlice.actions