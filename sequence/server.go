package main

import (
	"fmt"
	"net"
	"net/http"
	"os"
	"os/exec"
	"time"

	"github.com/gin-gonic/gin"
)

func main() {
	fmt.Println("=======================================================")
	fmt.Println("=======================================================")
	fmt.Println("------------------------------------------------------")
	// CheckFirewall := checkFirewal()
	// fmt.Println("Check : " + checkFirewall)
	fmt.Println("------------------------------------------------------")

	root := os.Getenv("__root")

	r := gin.Default()

	r.Use(func(c *gin.Context) {
		allowedOrigins := []string{
			"http://127.0.0.1:3000", "http://192.168.1.10:3000", "http://localhost:3000",
			"http://127.0.0.1:5500", "http://192.168.1.10:5500", "http://localhost:5500",
			"http://127.0.0.1", "http://192.168.1.10", "http://localhost", "http://localhost:8393",
		}
		origin := c.GetHeader("Origin")
		if contains(allowedOrigins, origin) {
			c.Header("Access-Control-Allow-Origin", origin)
		}
		c.Header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")
		c.Header("Access-Control-Allow-Headers", "X-Requested-With,content-type")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Next()
	})

	// Ganti pengaturan file statis
	r.Static("/public", "./public")

	//=================================================

	r.GET("/login", func(c *gin.Context) {
		c.File("./login.html")
	})

	r.GET("/dashboard", func(c *gin.Context) {
		c.File("./dashboard.html")
	})

	//=================================================

	r.GET("/", func(c *gin.Context) {
		c.File("./index.html")
	})

	r.GET("/dev", func(c *gin.Context) {
		c.File("./public/index-dev.html")
	})

	r.GET("/index-glb", func(c *gin.Context) {
		c.File("./public/index-glb.html")
	})

	//=================================================

	r.GET("/pick", func(c *gin.Context) {
		c.File("./public/Pick-Material-Design-Color-Chart.html")
	})

	timeStart := time.Now().Format(time.RFC3339)

	r.GET("/infoapp", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"dateStart": timeStart,
			"dateNow":   time.Now().Format(time.RFC3339),
			"visitors":  0,
			"dataDev": map[string]string{
				"author":           "dnrahmath",
				"github":           "https://github.com/dnrahmath",
				"twitter":          "https://twitter.com/dnrahmath",
				"telegram-channel": "https://t.me/s/dnrahmath",
				"instagram":        "https://instagram.com/dnrahmath",
				"youtube":          "https://www.youtube.com/channel/UCHAc5jBOEF8KX348FslexwQ",
				"shopee":           "https://shopee.co.id/dnrahmath",
				"tokopedia":        "https://www.tokopedia.com/dnrahmath",
				"bukalapak":        "https://www.bukalapak.com/u/dnrahmath",
			},
		})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8393"
	}

	url := os.Getenv("ROOT_URL")
	if url == "" {
		url = getLocalIP()
	}

	fmt.Println("=======================================================")
	fmt.Println("IP Local Didapatkan")
	fmt.Println(url)
	fmt.Println("=======================================================")

	fmt.Println("------------------------------------------------------")
	fmt.Printf("Server is running on port %s.\n", port)
	fmt.Printf("lokasi file server.go atau directory root = %s\n", root)
	fmt.Println("------------------------------------------------------")
	fmt.Printf("%s\n", url)
	fmt.Println("------------------------------------------------------")
	fmt.Printf("http://localhost:%s/frontend\n", port)
	fmt.Printf("%s:%s/frontend\n", url, port)
	fmt.Println("------------------------------------------------------")
	fmt.Println("http://localhost:8393/")
	fmt.Println("------------------------------------------------------")
	fmt.Printf("http://%s:%s/\n", url, port)
	fmt.Printf("https://%s:%s/\n", url, port)
	fmt.Printf("http://%s:%s/infoapp\n", url, port)
	fmt.Printf("https://%s:%s/infoapp\n", url, port)
	fmt.Println("------------------------------------------------------")

	r.Run(":" + port)
}

func contains(arr []string, str string) bool {
	for _, a := range arr {
		if a == str {
			return true
		}
	}
	return false
}

func getLocalIP() string {
	interfaces, err := net.Interfaces()
	if err != nil {
		return "Unknown"
	}

	for _, i := range interfaces {
		addrs, err := i.Addrs()
		if err != nil {
			return "Unknown"
		}

		for _, addr := range addrs {
			if ipnet, ok := addr.(*net.IPNet); ok && !ipnet.IP.IsLoopback() && ipnet.IP.To4() != nil {
				return ipnet.IP.String()
			}
		}
	}

	return "Unknown"
}

func CheckFirewal() string {
	// Ganti perintah sesuai dengan perintah yang sesuai dengan sistem operasi dan firewall Anda
	command := "netsh advfirewall set allprofiles state off"

	cmd := exec.Command("cmd", "/C", command)

	output, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println("Error:", err)
		fmt.Println("Output:", string(output))
		return "Error: " + err.Error()
	}

	fmt.Println("Output:", string(output))
	return "Output: " + string(output)
}
