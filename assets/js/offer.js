import { db, auth } from "../../firebase/firebase-config.js";
import { getDocs, collection, updateDoc, doc, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { eventLogger } from "./logger.js";

async function showOffer(){
  const offerName = document.getElementById("offerName").value;
  const productName = document.getElementById("productName").value;
  const price = document.getElementById("price").value;

  if (!offerName || !productName || !price) {
    alert("Please fill all fields.");
    return;
  }

  try {
    const shopId = prompt("Enter the id for the product: ")
    const shopRef = doc(db, "shops", shopId);
    await updateDoc(shopRef, {
      productName: productName,
      price: price
    })
    eventLogger("Offer Added", `Offer: ${productName}`);
    alert("Offer added successfully!");
    
    document.getElementById("offerName").value = ""
    document.getElementById("productName").value = ""
    document.getElementById("price").value = ""

  } catch (error) {
    console.error("Error adding offer: ", error);
    alert("Failed to add offer.");
  }
}


document.getElementById("offer")?.addEventListener("click", () => {
  showOffer()
})