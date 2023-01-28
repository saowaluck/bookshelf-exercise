import Modal from "./Modal";
import useForm from "@/hooks/useForm";
import api from "@/utils/api";
import Image from "next/image";

const INITIAL_FORM = {
    title: "",
    desc: "",
    coverImg: "",
    category: "",
    finished: null,
};

const AddBookModal = ({ isShow, close, refresh }) => {
    const { form, register, registerRadio, reset } = useForm(INITIAL_FORM);
    const createBook = ({ book, onSuccess }) => {
        api.post("/bookshelf", book).then(onSuccess);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createBook({
            book: {
                ...form,
                owner: "bazsup",
            },
            onSuccess: () => {
                reset();
                refresh();
                close();
            },
        });
    };

    if (!isShow) return null;
    return (
        <Modal close={close}>
            <h1 className="text-title text-big">
                ADD TO
                <br />
                COLLECTION
            </h1>
            <form className="add-book-form" onSubmit={handleSubmit}>
                <div className="form-field">
                    <label className="field-label text-title">Title</label>
                    <div className="field-input">
                        <input {...register("title")} />
                    </div>
                </div>
                <div className="form-field">
                    <label className="field-label text-title">
                        Description
                    </label>
                    <div className="field-input">
                        <textarea rows={3} {...register("desc")} />
                    </div>
                </div>
                <div className="form-field">
                    <label className="field-label text-title">
                        Cover image
                    </label>
                    <div className="field-input">
                        <input {...register("coverImg")} />
                        <div className="image-thumbnail">
                            {form.coverImg === "" ? (
                                <img src="https://via.placeholder.com/120x160" />
                            ) : (
                                <Image
                                    src={form.coverImg}
                                    width={120}
                                    height={160}
                                    alt="cover image"
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-field">
                    <label className="field-label text-title">Category</label>
                    <div className="field-input">
                        <select {...register("category")}>
                            <option disabled></option>
                            <option>Computer</option>
                            <option>Novel</option>
                        </select>
                    </div>
                </div>
                <div className="form-field">
                    <label className="field-label text-title">
                        Have you read the book?
                    </label>
                    <div className="field-input pt-12 two-option">
                        <label>
                            <input
                                type="radio"
                                name="read-book"
                                {...registerRadio("finished", true)}
                            />
                            {` Yes, I have read it.`}
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="read-book"
                                {...registerRadio("finished", false)}
                            />

                            {` No, I haven't read it.`}
                        </label>
                    </div>
                </div>
                <div className="pt-12 text-right">
                    <button className="btn-primary">SAVE</button>
                </div>
            </form>
        </Modal>
    );
};

export default AddBookModal;
