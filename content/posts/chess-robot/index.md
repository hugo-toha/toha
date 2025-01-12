---
title: "Chess Robot"
date: 2022-06-08T09:00:00+00:00
description: Gantry style robot with a camera to play chess against a human player.
hero: images/chess.jpg
author:
  image: /images/sharwin_portrait.jpg
menu:
  sidebar:
    name: Chess Robot
    identifier: chess-robot
    weight: 4
tags: ["Python", "OpenCV", "Arduino", "Stepper Motors"]
# categories: ["Basic"]
---

This robot utilized stepper motors, a camera, sensors, and a gantry style system to interact with the chess board and play against a human opponent.

## System Hardware
The robot's frame was assembled using aluminum extrusion and 3D printed parts. 2 motors were used to drive the X-axis, and 1 motor was used to drive the Y-axis (horizontally). Timing belts were used to transfer the motion from the stepper motors to the gantry sliding on linear rails. Limit switches were placed at the end of each axis to home the robot and ensure every movement was accurate during gameplay.

<div align="center">
    <img src="chess_robot_frame.jpg" alt="Chess Robot Frame" style="border-radius: 15px;">
</div>

In order to interact with the chess pieces and board, a gripper was developed to interface with each of the pieces' stem. The gripper assembly was mounted to a lead screw in order to raise and lower the gripper.

<div align="center">
    <img src="chess_gripper.png" alt="Chess Robot Gripper" style="border-radius: 15px;">
</div>

## Computer Vision
A standard USB camera was used to track the game state in real time. Our initial approach was to attempt to classify each piece on every square after breaking up the image by pixels for each square. However, this approach was difficult to train a model for and was computationally expensive (especially on the Raspberry Pi). Instead, we decided to use a simpler approach by comparing a previous image of the board to the current image to determine which pieces had moved.

Since the beginning of a chess game is always the same and known to the computer, we can cheat a little bit with the computer vision in order to improve its performance. Instead of attempting to classify the piece, we only need to notice changes in the position compared to the previous position. For example if the squares `e2` and `e4` are marked as different from the starting position, we know that a white pawn started on `e2` and has moved to `e4`. Further, we don't even need to recognize a pieces color, only if a square is occupied or not. After segmenting the image into squares, we can compare the pixel values of each square to the previous image to determine if a piece has moved. Integrating this involved feeding the detected move through the chess engine and the robot's state. This allowed the robot to even detect illegal moves and request the human player to correct them.


<div align="center">
    <img src="camera.jpg" alt="Chess Robot Frame" style="border-radius: 15px;">
</div>

This technique worked really well, despite uneven lighting conditions and shadows. We were also able to use alternate colors for the pieces since the image comparison was based on the pixel values and not the color of the pieces.

## Resetting the Board
Resetting a chess board after a game is such a simple task for humans it is often overlooked. However, when presented with the open-ended task, capable of making any decisions to optimize the process, the complexity of the task quickly becomes apparent and akin to travelling salesman.

<div align="center">
    <img src="frame_from_above.jpg" alt="Chess Robot Frame" style="border-radius: 15px;">
</div>

The blue squares outlining the main board are reserved for captured pieces (and the extra queen). Whenever a capture occurs, the robot places the captured piece into the corresponding square.

When solving for an optimal path using a state-space exploration with A*, the space rapidly expands and is infeasible to solve. Our approach was to use a greedy algorithm minimizing axes movement.

```python
from math import sqrt
from CapturedPieceManagement import CapturedPieceManagement
import chess
import Arduino

whiteSetup = [
    list("RNBQQBNR"),
    list("PPPPPPPP"),
]
blackSetup = [
    ["r", "p"],
    ["n", "p"],
    ["b", "p"],
    ["q", "p"],
    ["q", "p"],
    ["b", "p"],
    ["n", "p"],
    ["r", "p"],
]


def calculateMoveDistance(m):
    if m[0] == "board":
        return chess.square_distance(m[1], m[2])
    if m[0] == "white":
        return 2 - m[2] + chess.square_distance(chess.square(m[1], 7), m[3])
    if m[0] == "black":
        if m[1] == -1:
            return 1 + chess.square_distance(chess.square(0, m[2]), m[3])
        else:
            return 1 + chess.square_distance(chess.square(7, m[2]), m[3])


def getSuccessors(fen, white, black):
    successors = []
    b: chess.Board = chess.Board(fen)
    empty_squares = [x for x in chess.SQUARES if b.piece_at(x) is None]
    for i in range(64):
        p = b.piece_at(i)
        if p is not None and init_board.piece_at(i) != p:
            min_dist = 100
            min_square = None
            for j in empty_squares:
                if init_board.piece_at(j) == p:
                    d = sqrt((chess.square_file(i) - chess.square_file(j))**2 +
                             (chess.square_rank(i) - chess.square_rank(j))**2)
                    if d <= min_dist:
                        min_dist = d
                        min_square = j
            if min_square is not None:
                new_board = b.copy()
                new_board.set_piece_at(min_square, p)
                new_board.remove_piece_at(i)
                successors.append(((new_board.fen(), white, black),
                                   ("board", i, min_square), min_dist))
    # White takens
    for x in range(8):
        for y in range(2):
            min_dist = 100
            min_square = None
            if x == 3 and y == 0:
                continue
            if white[y, x] == 1:
                p = whiteSetup[y][x]
                for e in empty_squares:
                    if str(init_board.piece_at(e)) == p:
                        d = calculateMoveDistance(("white", x, y, e))
                        if d <= min_dist:
                            min_dist = d
                            min_square = e
            if min_square is not None:
                new_board = b.copy()
                new_board.set_piece_at(min_square,
                                       init_board.piece_at(min_square))
                newWhite = white.copy()
                newWhite[y, x] = 0
                successors.append(((new_board.fen(), newWhite, black),
                                   ("white", x, y, min_square), min_dist))
    # Black takens
    for x in [-1, 1]:
        for y in range(8):
            min_dist = 100
            min_square = None
            if x == -1 and y == 3:
                continue
            if x == -1:
                blackCoord = 0
            else:
                blackCoord = 1
            if black[y, blackCoord] == 1:
                p = blackSetup[y][blackCoord]
                for e in empty_squares:
                    # print(e, init_board.piece_at(e))
                    if str(init_board.piece_at(e)) == p:
                        d = calculateMoveDistance(("black", x, y, e))
                        if d <= min_dist:
                            min_dist = d
                            min_square = e
            if min_square is not None:
                new_board = b.copy()
                new_board.set_piece_at(min_square,
                                       init_board.piece_at(min_square))
                newBlack = black.copy()
                newBlack[y, x] = 0
                successors.append(((new_board.fen(), white, newBlack),
                                   ("black", x, y, min_square), min_dist))

    return successors


startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"


def findPathGreedy(fen, captured: CapturedPieceManagement):
    currentSquare = 56
    currentFen = fen
    w = captured.white
    b = captured.black
    moves = []
    while (currentFen.split(" ")[0] != startingFen):
        print("Fen: " + currentFen)
        print("White: " + str(w))
        print("Black: " + str(b))
        possibleMoves = getSuccessors(currentFen, w, b)
        bestCost = 100
        if len(possibleMoves) == 0:
            return False
        for m in possibleMoves:
            if m[1][0] == "board":
                dstToStart = chess.square_distance(m[1][1], currentSquare)
            if m[1][0] == "white":
                dstToStart = calculateMoveDistance(
                    ("white", m[1][1], m[1][2], m[1][3]))
            if m[1][0] == "black":
                dstToStart = calculateMoveDistance(
                    ("black", m[1][1], m[1][2], m[1][3]))
            cost = m[2] + dstToStart
            if cost < bestCost:
                bestCost = cost
                bestMove = m

        currentSquare = bestMove[1][-1]
        currentFen = bestMove[0][0]
        w = bestMove[0][1]
        b = bestMove[0][2]
        moves.append((bestMove[1], bestMove[0][0]))
        print(bestMove[1])
    return moves


def convertSquareToCoordinates(square: str):
    return [ord(square[0]) - ord('a'), 8 - int(square[1])]


def getAdjacentSquares(square: int):
    return [square + 1, square - 1, square + 8, square - 8]


def isMoveLift(fen, move):
    b = chess.Board(fen)
    if move[0] == "board":
        # Check to see if there are pieces between start and end square

        start = move[1]
        end = move[2]
        minimum = min(start, end)
        maximum = max(start, end)
        offset = maximum - minimum
        if offset % 8 == 0:
            for i in range(minimum + 8, maximum, 8):
                if b.piece_at(i) is not None:
                    return False
        if chess.square_file(start) == chess.square_file(end):
            for i in range(minimum + 1, maximum):
                if b.piece_at(i) is not None:
                    return False
        if offset % 9 == 0:
            for i in range(minimum + 9, maximum, 9):
                if b.piece_at(i) is not None:
                    return False
                for s in getAdjacentSquares(i):
                    if b.piece_at(s) is not None:
                        return False
        if offset % 7 == 0:
            for i in range(minimum + 7, maximum, 7):
                if b.piece_at(i) is not None:
                    return False
                for s in getAdjacentSquares(i):
                    if b.piece_at(s) is not None:
                        return False
    return True


def reset_game_board(fen, captured: CapturedPieceManagement):
    a = Arduino.Arduino("/dev/cu.usbmodem142101")
    a.waitForReady()
    path = findPathGreedy(fen, captured)
    if path is False:
        print("Unable to find path")
        return False
    for m, f in path:
        if m[0] == "board":
            startSquare = convertSquareToCoordinates(chess.square_name(m[1]))
            endSquare = convertSquareToCoordinates(chess.square_name(m[2]))
            a.sendCommand("move", [startSquare[0], startSquare[1]])
            a.waitForReady()
            if isMoveLift(f, m):
                a.sendCommand("pickup", [])
            else:
                a.sendCommand("smallPickup", [])
            a.waitForReady()
            a.sendCommand("move", [endSquare[0], endSquare[1]])
            a.waitForReady()
            a.sendCommand("drop", [])
            a.waitForReady()
        if m[0] == "white":
            a.sendCommand("moveWhiteTaken", [m[1], m[2]])
            a.waitForReady()
            a.sendCommand("pickupTaken", [])
            endSquare = convertSquareToCoordinates(chess.square_name(m[3]))
            a.sendCommand("move", [endSquare[0], endSquare[1]])
            a.waitForReady()
            a.sendCommand("drop", [])
            a.waitForReady()
        if m[0] == "black":
            a.sendCommand("moveBlackTaken", [m[1], m[2]])
            a.waitForReady()
            a.sendCommand("pickupTaken", [])
            endSquare = convertSquareToCoordinates(chess.square_name(m[3]))
            a.sendCommand("move", [endSquare[0], endSquare[1]])
            a.waitForReady()
            a.sendCommand("drop", [])
            a.waitForReady()


if __name__ == "__main__":
    cap = CapturedPieceManagement()
    b = chess.Board()
    # Testing
    b.set_board_fen("r3k1nr/p4pNp/n7/1p1pP2P/6P1/3P1Q2/PRP1K3/q5bR")
    cap.placePiece("black", "pawn")
    cap.placePiece("black", "pawn")
    cap.placePiece("black", "pawn")
    cap.placePiece("black", "bishop")
    cap.placePiece("white", "pawn")
    cap.placePiece("white", "pawn")
    cap.placePiece("white", "bishop")
    cap.placePiece("white", "bishop")
    cap.placePiece("white", "knight")
    print(findPathGreedy(b.fen(), cap))
    reset_game_board(b.fen(), cap)
```
