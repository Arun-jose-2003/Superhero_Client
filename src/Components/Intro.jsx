import React from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Intro() {
  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }}>
      {/* Banner Section */}
      <div
        style={{
          backgroundImage:
            "url('https://th.bing.com/th/id/R.f73d17d34cb8e568bdd5f6a656caff2b?rik=nL1QPHoXvuGQ3w&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fc%2fc%2f0%2f1047885-superhero-wallpaper-3840x2160-ipad-retina.jpg&ehk=g0v8XixrozacR%2bsX7fLj6%2fjxG9OamnHTYYClGhGOe8M%3d&risl=&pid=ImgRaw&r=0')",
          backgroundSize: "cover",
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          backgroundPosition: "center",
        }}
      >
        <h1
          style={{
            fontSize: "3.5rem",
            fontWeight: "700", // Bold weight for emphasis
            color: "#FF6F61", // Warm, bold color
            textShadow: "3px 3px 6px rgba(0, 0, 0, 0.6)", // Strong shadow for visibility
            animation: "fadeIn 3s ease-in-out",
          }}
        >
          I am a Superhero
        </h1>
      </div>

      {/* Story Section */}
      <Container fluid style={{ padding: "3rem" }}>
        {/* Story Item 1: Left Image, Right Story */}
        <Row className="mb-5">
          <Col md={6} className="d-flex justify-content-center align-items-center">
            <Image
              src="https://4.bp.blogspot.com/-AMR-xrc9_Mg/V4Gy3dmb_tI/AAAAAAAHRh4/h5pGXNfgtG4swTMQigr1dcRTR82xjc7iACLcB/s1600/superheroes-kids-clipart-101.png"
              alt="Superhero"
              fluid
              style={{
                width: "80%", // Reduced to make the image more balanced
                maxHeight: "400px", // Increase height for better prominence
                objectFit: "contain",
                borderRadius: "15px",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)", // Added stronger shadow to highlight the image
                display: "block",
                margin: "0 auto", // Centers the image horizontally
              }}
            />
          </Col>
          <Col
            md={6}
            className="d-flex align-items-center"
            style={{
              border: "2px solid #f0f0f0",
              borderRadius: "15px",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
              padding: "2rem",
              backgroundColor: "#ffffff",
            }}
          >
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700", // Bold weight for a strong title
                    color: "#FF6F61", // Bold color for the title
                  }}
                >
                  The Beginning
                </Card.Title>
                <Card.Text
                  style={{
                    fontSize: "1.3rem",
                    color: "#333333",
                    lineHeight: "1.8",
                    fontStyle: "italic",
                    color: "#1E90FF", // Blue for an accent color
                    textAlign: "left",
                  }}
                >
                  <i>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam nesciunt laborum, labore, enim debitis corporis quis quibusdam dolorem tenetur amet, officia vel. Velit, rem eaque? Similique unde necessitatibus esse consequuntur!
                  Ipsam quis natus quidem aperiam nesciunt dolorem numquam a labore, aliquid harum! Quos quaerat mollitia nisi a vel, saepe delectus, placeat molestias obcaecati maxime odio quo pariatur quia error impedit.
                  Voluptates facere, cumque ut sit adipisci quaerat explicabo soluta, doloribus itaque ad dolorum? Provident quis sequi deserunt reiciendis quaerat quae minima explicabo, id animi dicta, fugiat, delectus dolores? Ratione, officia. From ordinary beginnings to mastering extraordinary abilities.</i>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Story Item 2: Right Image, Left Story */}
        <Row className="mb-5 flex-row-reverse">
          <Col md={6} className="d-flex justify-content-center align-items-center">
            <Image
              src="https://4.bp.blogspot.com/-AMR-xrc9_Mg/V4Gy3dmb_tI/AAAAAAAHRh4/h5pGXNfgtG4swTMQigr1dcRTR82xjc7iACLcB/s1600/superheroes-kids-clipart-101.png"
              alt="Superhero"
              fluid
              style={{
                width: "80%",
                maxHeight: "400px",
                objectFit: "contain",
                borderRadius: "15px",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)", // Highlight image with strong shadow
                display: "block",
                margin: "0 auto",
              }}
            />
          </Col>
          <Col
            md={6}
            className="d-flex align-items-center"
            style={{
              border: "2px solid #f0f0f0",
              borderRadius: "15px",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
              padding: "2rem",
              backgroundColor: "#ffffff",
            }}
          >
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    color: "#FF6F61",
                  }}
                >
                  The Journey
                </Card.Title>
                <Card.Text
                  style={{
                    fontSize: "1.3rem",
                    color: "#333333",
                    lineHeight: "1.8",
                    fontStyle: "italic",
                    color: "#1E90FF",
                    textAlign: "left",
                  }}
                >
                  <i>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam inventore quos deserunt dignissimos doloribus porro possimus sit. Explicabo officiis ducimus excepturi porro voluptatum accusamus laudantium similique voluptates accusantium. Voluptatem, mollitia.
                  Soluta aliquid quaerat eos deserunt blanditiis cum praesentium fugit voluptatibus error rem voluptate sit deleniti, repudiandae voluptas dolore omnis? Recusandae officia beatae voluptatum velit, ex quas nostrum modi ratione quis? It wasn't easy, but through perseverance, I learned to harness my powers for good.</i>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Intro;
