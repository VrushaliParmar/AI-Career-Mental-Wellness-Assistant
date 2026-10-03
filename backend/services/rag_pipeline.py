from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA


def build_rag_chain(vector_store, llm_model="gpt-4o-mini"):
    llm = ChatOpenAI(model=llm_model, temperature=0.2)
    return RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=vector_store.as_retriever(search_kwargs={"k": 4}),
    )
