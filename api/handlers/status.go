package handlers

import "net/http"

func Status(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("OK"))
}
