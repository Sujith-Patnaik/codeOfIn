import Link from 'next/link'
import React from 'react'

export default function SearchDisplay({ name, id, rating }) {

    return (
        <div>
            <Link key={id} href={`res/${id}`}>
                {name} : {id} : {rating}
            </Link>
        </div>
    )
}
