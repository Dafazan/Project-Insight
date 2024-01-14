'use client'
import React, { useState, useEffect } from 'react';
import {
    collection,
    doc,
    getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/navigation";

function Custom({ params }) {
    const [fetchedDocumentData, setFetchedDocumentData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const docRef = doc(db, "url-shortener", params.custom); // Reference the specific document
                const docSnap = await getDoc(docRef);
                setFetchedDocumentData(docSnap.data());
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [params]);

    const { push } = useRouter();

    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {fetchedDocumentData ? (
                        push(fetchedDocumentData.url)

                    ) : (
                        <div>URL Not found</div>
                    )}
                </>
            )}
        </>
    );
}

export default Custom;
