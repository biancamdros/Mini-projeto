import useSWR from 'swr'
import {useState} from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image';

import styles from '../styles/Index.module.css'

export function TheForm({filtro, url, acao}){

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    return (
        <div className={styles.div_form}>
            <form className={styles.form_search_movie} onSubmit={handleSubmit(acao)}>
                <label htmlFor="titleSearchString">{filtro}</label>

                <input 
                    id="titleSearchString" 
                    {...register("titleSearchString", { required: true, minLength: 3})} 
                    type="text" 
                    autoComplete="true"
                    placeholder='Nome do artista...'
                />

                {errors.titleSearchString && <span>Insira no mínimo três caracteres   </span>}
                <button type='submit'>{url === '' ? 'Mostrar' : 'Ocultar'}</button>
                
            </form>
        </div>
    )
}

export function TheAnime({data,show}){

    if (!show) return (<div></div>)

    if (!data) return (<div></div>)

    if (data.error) return (<div>falha na pesquisa</div>)

    if (data.Response == 'False') return (<div>Não foi encontrado nenhum filme com essas informações </div>)

    return (
        <div>
            <hr />
            <br />
            <div className={styles.div_title}> 
                <Image width={200} height={200} src={`https://www.vagalume.com.br/${data?.artist?.pic_medium}`} alt={data?.artist?.desc}/>
                <h1>{data?.artist?.desc}</h1>
                <h3>Rank:{data?.artist?.rank?.pos}</h3>
                {data?.artist?.genre.map((g,i)=>
                    <div key={i}>{g.name}</div>
                 )}  
            </div>
           <div>
                <table className={styles.banda}>
                    <thead>
                        <tr>
                            <th>Banda</th>
                            <th>Gênero</th>
                            <th>Rank</th>
                            <th>Músicas</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{data?.artist?.desc}</td>
                            <td> {data?.artist?.genre.map((g,i)=>
                                    <p key={i}>{g.name}</p>
                            )} </td>
                            <td>{data?.artist?.rank?.pos}</td>
                            <td>{data?.artist?.lyrics.item.length}</td>
                        </tr>
                    </tbody>
                </table>
            </div>     
        </div>
    )
    
}

export function Letter({data,show}){
    if (!show) return (<div></div>)

    if (!data) return (<div></div>)

    if (data.error) return (<div>falha na pesquisa</div>)

    if (data.Response == 'False') return (<div>Não foi encontrado nenhum filme com essas informações </div>)


    return(
        <div>
            <div className={styles.letras}>
                <h2>Letras</h2>
            </div>

            <div>
                <table className={styles.banda}>
                    <thead>
                        <tr>
                            <th>Músicas</th>
                            <th>Letras</th>
                            <th>Tradução</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.artist?.lyrics?.item.map((l,i)=>
                            <tr key={i}>
                                <td>
                                   {l?.desc}
                                </td>
                                <td>
                                    <a href={`https://www.vagalume.com.br/${l.url}`}>Ver letra</a>
                                </td>
                                <td>
                                    <a href={`https://www.vagalume.com.br/${l.turl}`}>Ver tradução</a>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default function Artists(){

    const [state, setState] = useState({url:'', titleSearchString:''});

    const {data, error} = useSWR(state.url, async () => {
        
        if (state.url === '' || state.titleSearchString ==='') return {data:''}

        const res = await fetch(`${state.url}/${state.titleSearchString}/index.js`)
        const json = await res.json();

        return json

    })


    const onClickHandler = () => {
        
        const t = document.querySelector('#titleSearchString').value


        if (state.url === '') {
            setState({url:'https://www.vagalume.com.br',titleSearchString:t})
        }
        else{
            setState({url:'',titleSearchString: state.titleSearchString, yearSearchNumber: state.yearSearchNumber})
        }
    }



    return (
        <div>
            <TheForm filtro={'Nome do Artista'} url={state.url} acao={onClickHandler}/>
            <TheAnime data={error?{error:'Erro na pesquisa'}: data ? data: {data:''} } show={state.url !== ''} />
            <Letter  data={error?{error:'Erro na pesquisa'}: data ? data: {data:''} } show={state.url !== ''}/>
        </div>
    )
}