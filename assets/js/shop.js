import { db, auth } from "../../firebase/firebase-config.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { eventLogger } from "./logger.js";

window.addShop = async function () {
  const brand = document.getElementById("shopName").value;
  const category = document.getElementById("category").value;
  const floor = document.getElementById("floor").value;

  if (!brand || !category || !floor) {
    alert(`Please fill all the fields.`);
    return;
  }

  const username = auth.currentUser.displayName || auth.currentUser.email || "Anonymous";

  try {
    const shopRef = collection( db, "shops");
    await addDoc(shopRef, {
      brand: brand,
      category: category,
      floor: floor,
      username: username,
      createdAt: serverTimestamp()
    });
    eventLogger("Shop Created", `Shop-name: ${brand}`);
    alert(`Shop created by ${username}`);
  } catch (error) {
    console.log(`Error occurred in creating the shop: ${error.message}`);
  }
}
