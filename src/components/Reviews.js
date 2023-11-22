import React, { useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { reviewRef,db } from '../firebase/firebase';
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert';

const Reviews = ({id, prevRating, userRated}) => {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState ("");
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [data, setData] = useState([]);

  const sendReview = async () => {
    setLoading(true);
    try{
      await addDoc(reviewRef,{
        movieid : id,
        name : "Harshal Dhole",
        rating : rating,
        thought: form,
        timestamp: new Date().getTime()
      })
      const ref = doc(db, "movies", id);
      await updateDoc(ref,{
        rating: prevRating + rating,
        rated: userRated + 1
      })
      setRating(0);
      setForm("");
      swal({
        title:"Review Sent",
        icon:"success",
        buttons:false,
        timer:3000
      })
    }catch(error){
      swal({
        title: error.message ,
        icon:"error",
        buttons: false,
        timer: 3000
      })
    }
   setLoading(false);
  }
   useEffect(()=>{
    async function getData() {
    setReviewsLoading(true);
    let quer = query(reviewRef, where("movieid", "==", id))
    const querySnapShot = await getDocs(quer);

      querySnapShot.forEach((doc)=>{
        setData((prev)=>[...prev, doc.data()])
      })

    setReviewsLoading(false);
    }
    getData();
   },[])
  return (
    <div className="mt-4 border-gray-400 border-t-2 w-full">
       <ReactStars
                size={30}
                half={true}
                value={rating}
                onChange={(rate) => setRating(rate)}
              />
      <input
        placeholder='Share Your Thoughts Here....'
        value={form}
        onChange={(e) => setForm(e.target.value)}
        className="p-2 w-full outline-none bg-gray-950"
      />
      <button onClick={sendReview} className="p-2 w-full flex justify-center outline-none bg-green-600 hover:bg-green-800 cursor-pointer">{loading ? <TailSpin height={20} color="white"/> :"Share"}</button>
      { reviewsLoading ? <div className="mt-6 flex justify-center"><ThreeDots height={10} color="white"/></div> : 
      
      <div className="mt-4">
          {data.map((e, i)=>{
            return(
              <div className="p-2 w-full border-b header bg-opacity-50 border-gray-600 mt-2" key={i}>
                <div className="flex items-center " >
                  <p className="text-blue-500 text-lg">{e.name}</p>
                  <p className="ml-2 text-xs" >({new Date(e.timestamp).toLocaleString()})</p>
                </div>  
                <ReactStars
                  size={15}
                  half={true}
                  value={e.rating}
                  edit={false}
                />
                  <p>{e.thought}</p>
              </div>
            )
          }

          )}
      </div>
      }
    </div>
  )
}

export default Reviews
