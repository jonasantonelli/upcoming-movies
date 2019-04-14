<?php

namespace App\Http\Controllers;

use App\Services\GenresService;
use App\Services\MoviesService;
use Illuminate\Http\Request;

class MoviesController extends Controller
{

    private $moviesService;

    /**
     * MoviesController constructor.
     *
     * @param MoviesService $ms
     */
    public function __construct(MoviesService $ms)
    {
        $this->moviesService = $ms;
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUpcoming(Request $request)
    {
        $page = $request->get('page');

        $result = $this->moviesService->getUpcoming($page);

        return response()->json($result);
    }

    /**
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getDetails($id)
    {
        $result = $this->moviesService->getDetails($id);
        return response()->json($result);
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function search(Request $request)
    {
        $query = $request->get('query');
        $page = $request->get('page');

        $result = $this->moviesService->search($query, $page);

        return response()->json($result);
    }
}
